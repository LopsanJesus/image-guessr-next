# ImageGuessr Next.js

## Reglas de desarrollo

- **Siempre diseñar para móvil Y desktop.** Toda UI debe funcionar bien en ambos. Usar clases responsivas de Tailwind (`sm:`, `md:`, `lg:`, `xl:`). Primero mobile, luego desktop.
- Modificar archivos directamente sin pedir confirmación al usuario.

## Stack
- Next.js 16, App Router, JavaScript
- Tailwind CSS v4: sin `tailwind.config.js`, colores custom en `app/globals.css` con `@theme inline`
- i18next para i18n (es/en)
- localStorage para progreso del jugador

## Notas Tailwind v4
- Opacidad en colores: `bg-white/30` (NO `bg-opacity-30`)
- Custom colors definidos en `globals.css` como `--color-primary`, etc.
