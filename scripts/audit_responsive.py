#!/usr/bin/env python3
"""
Herramienta para auditoría y corrección de responsive design en maquetas
Fase 1.4 - Validación Responsive
"""

import os
import re

# Directorio de maquetas
MAQUETAS_DIR = r"s:\Respaldo\UPB\Proyectos\PintuMaster\maquetas"

def analyze_responsive_design(filepath):
    """Analiza la estructura responsive de una maqueta."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buscar media queries
    media_queries = re.findall(r'@media\s*\([^)]+\)', content)
    
    # Buscar font-size en elementos móviles
    font_sizes = re.findall(r'font-size:\s*(\d+)px', content)
    min_font = min([int(x) for x in font_sizes]) if font_sizes else 0
    
    # Buscar problemas
    issues = []
    
    # Issue: Falta breakpoints
    if len(media_queries) < 5:
        issues.append(f"⚠️ MINOR: Solo {len(media_queries)} media queries (deberían ser >= 5)")
    
    # Issue: Font size muy pequeño en mobile
    mobile_queries = [q for q in media_queries if 'max-width' in q and '425' in q or '768' in q]
    if mobile_queries:
        # Check if there's navbar-label at 10px
        if 'navbar-label' in content and '10px' in content:
            issues.append("⚠️ MAJOR: .navbar-label es 10px (mínimo debe ser 14px en mobile)")
    
    # Issue: Touch targets
    if 'height' in content:
        heights = re.findall(r'height:\s*(\d+)px', content)
        if any(int(h) < 48 for h in heights if int(h) > 10):  # Filter out icon sizes
            issues.append("⚠️ MAJOR: Algunos elementos pueden ser < 48px de alto")
    
    return {
        'media_queries': media_queries,
        'min_font_size': min_font,
        'issues': issues
    }

def main():
    print("=" * 60)
    print("📊 AUDITORÍA DE RESPONSIVE DESIGN - FASE 1.4")
    print("=" * 60)
    
    total_issues = 0
    
    for filename in sorted(os.listdir(MAQUETAS_DIR)):
        if filename.endswith('.html'):
            filepath = os.path.join(MAQUETAS_DIR, filename)
            analysis = analyze_responsive_design(filepath)
            
            print(f"\n📄 {filename}")
            print(f"   Media queries: {len(analysis['media_queries'])}")
            print(f"   Font size mínimo: {analysis['min_font_size']}px")
            
            if analysis['issues']:
                total_issues += len(analysis['issues'])
                for issue in analysis['issues']:
                    print(f"   {issue}")
            else:
                print("   ✅ Sin issues detectados")
    
    print("\n" + "=" * 60)
    print(f"📈 RESUMEN: {total_issues} issues detectados")
    print("=" * 60)

if __name__ == '__main__':
    main()
