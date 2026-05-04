#!/usr/bin/env python3
"""
Análisis automático de componentes reutilizables en maquetas HTML
Phase 1.5 - Documentación de Componentes
"""

import re
from pathlib import Path

MAQUETAS_DIR = Path(r"s:\Respaldo\UPB\Proyectos\PintuMaster\maquetas")

# Patrones a buscar
PATTERNS = {
    'buttons': r'<button[^>]*class="[^"]*btn[^"]*"[^>]*>',
    'inputs': r'<input\s+type="(?:text|email|password|number|date|tel)"',
    'forms': r'<form[^>]*>',
    'cards': r'<div[^>]*class="[^"]*card[^"]*"',
    'badges': r'<span[^>]*class="[^"]*badge[^"]*"',
    'modals': r'<div[^>]*class="[^"]*modal[^"]*"',
    'headers': r'<div[^>]*class="[^"]*header[^"]*"',
    'tables': r'<table[^>]*>',
    'grids': r'grid(?:-|_)(?:2|3|4|auto)',
    'navigation': r'<nav[^>]*>|navbar|sidebar',
}

def analyze_file(filepath):
    """Analiza un archivo HTML y extrae componentes."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    components = {}
    for name, pattern in PATTERNS.items():
        matches = len(re.findall(pattern, content, re.IGNORECASE))
        if matches > 0:
            components[name] = matches
    
    # Contar elementos específicos
    class_pattern = r'class="([^"]*)"'
    classes = re.findall(class_pattern, content)
    
    return {
        'components': components,
        'unique_classes': len(set(classes)),
        'total_elements': len(classes),
    }

def main():
    print("=" * 70)
    print("📊 ANÁLISIS DE COMPONENTES - PHASE 1.5")
    print("=" * 70)
    
    all_components = {}
    
    for html_file in sorted(MAQUETAS_DIR.glob('*.html')):
        analysis = analyze_file(html_file)
        filename = html_file.name
        
        print(f"\n📄 {filename}")
        print(f"   Elementos de UI: {analysis['total_elements']}")
        print(f"   Clases únicas: {analysis['unique_classes']}")
        
        if analysis['components']:
            print("   Componentes encontrados:")
            for comp_type, count in sorted(analysis['components'].items()):
                print(f"     - {comp_type}: {count}")
                all_components.setdefault(comp_type, []).append((filename, count))
    
    print("\n" + "=" * 70)
    print("📈 RESUMEN GLOBAL DE COMPONENTES")
    print("=" * 70)
    
    for comp_type, files in sorted(all_components.items()):
        total = sum(count for _, count in files)
        avg = total / len(files)
        print(f"\n{comp_type.upper()}")
        print(f"  Total: {total} | Promedio por maqueta: {avg:.1f}")
        print(f"  Usadas en: {len(files)}/12 maquetas")
    
    print("\n" + "=" * 70)

if __name__ == '__main__':
    main()
