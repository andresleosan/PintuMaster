#!/usr/bin/env python3
"""
Script para agregar media queries completos a todas las maquetas
Fase 1.4 - Validación Responsive
"""

import os
import re

MAQUETAS_DIR = r"s:\Respaldo\UPB\Proyectos\PintuMaster\maquetas"

# Template de media queries estándar para agregar
RESPONSIVE_TEMPLATE = """
      /* ==================== RESPONSIVE ==================== */
      /* Extra Small (320px - 425px) */
      @media (max-width: 425px) {
        body {
          font-size: 14px;
        }

        .header {
          padding: 12px;
        }

        .navbar-label,
        .navbar-item {
          font-size: 12px;
        }

        .main {
          padding: 12px;
        }

        button,
        .btn,
        [role="button"] {
          min-height: 48px;
          padding: 12px;
        }

        input,
        select,
        textarea {
          min-height: 48px;
          padding: 12px;
          font-size: 16px;
        }
      }

      /* Small (425px - 768px) */
      @media (min-width: 426px) and (max-width: 768px) {
        .main {
          padding: 16px;
        }

        button,
        .btn,
        [role="button"] {
          min-height: 44px;
        }
      }

      /* Large (1024px - 2559px) */
      @media (min-width: 1025px) and (max-width: 2559px) {
        .sidebar {
          display: block !important;
        }

        .navbar {
          display: none !important;
        }
      }

      /* Extra Large (2560px+) */
      @media (min-width: 2560px) {
        body {
          font-size: 16px;
        }

        .main {
          max-width: 1400px;
          margin: 0 auto;
        }

        button,
        .btn {
          min-height: 52px;
        }
      }
"""

def process_file(filepath):
    """Procesa un archivo HTML y agrega/actualiza media queries."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Contar media queries actuales
    media_count = len(re.findall(r'@media', content))
    
    # Si tiene media queries, buscar el punto donde insertarlas
    if media_count > 0:
        # Buscar el último media query existente
        match = re.search(r'(@media[^}]*\{[^}]*\})\s*</style>', content)
        if match:
            # Reemplazar el último media query con uno mejorado
            last_media = match.group(1)
            # Insertar después del último media query
            insertion_point = content.find('</style>')
            
            # Solo agregar si no hay muchos media queries ya
            if media_count < 4:
                improved = content[:insertion_point] + "\n" + RESPONSIVE_TEMPLATE + "    </style>"
                improved = improved.replace('    </style>', '</style>')
                return improved
    
    return content

def main():
    print("=" * 70)
    print("🔧 HERRAMIENTA DE REPARACIÓN - MEDIA QUERIES RESPONSIVE")
    print("=" * 70)
    
    processed = 0
    for filename in sorted(os.listdir(MAQUETAS_DIR)):
        if filename.endswith('.html'):
            filepath = os.path.join(MAQUETAS_DIR, filename)
            
            # Check current state
            with open(filepath, 'r', encoding='utf-8') as f:
                content_before = f.read()
            media_before = len(re.findall(r'@media', content_before))
            
            # Process file
            content_after = process_file(filepath)
            media_after = len(re.findall(r'@media', content_after))
            
            if media_before < media_after or media_before == 1:
                # Write back only if improved
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content_after)
                
                print(f"✅ {filename:30} {media_before} → {media_after} media queries")
                processed += 1
            else:
                print(f"⏭️  {filename:30} Ya optimizado ({media_before} queries)")
    
    print("=" * 70)
    print(f"✨ {processed} archivos actualizados")
    print("=" * 70)

if __name__ == '__main__':
    main()
