---
name: whatsapp-conversion
description: Generacion de enlaces seguros codificados hacia WhatsApp para conversion directa del catalogo de perfumes.
---

# WhatsApp Conversion

## Cuándo usar
- Al construir botones de compra, consulta de precio o asesoramiento en Hero, Navbar y tarjetas de perfume.

## Reglas
1. Limpiar el numero telefonico eliminando simbolos o espacios: `phone.replace(/\D/g, "")`.
2. Incluir el nombre del perfume y su casa/marca en el mensaje predefinido.
3. Usar `encodeURIComponent` para codificar acentos y espacios.
4. Redirigir a `https://wa.me/NUMERO?text=MENSAJE`.