#!/usr/bin/env python3
"""
Generate PWA icons
Requires: pip install Pillow
Run: python generate-icons.py
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    def create_icon(size):
        # Create image with gradient background
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img)
        
        # Create gradient effect (simplified)
        for i in range(size):
            ratio = i / size
            r1, g1, b1 = 102, 126, 234  # #667eea
            r2, g2, b2 = 118, 75, 162   # #764ba2
            r = int(r1 + (r2 - r1) * ratio)
            g = int(g1 + (g2 - g1) * ratio)
            b = int(b1 + (b2 - b1) * ratio)
            draw.rectangle([(0, i), (size, i+1)], fill=(r, g, b))
        
        # Draw rocket emoji (as text)
        try:
            # Try to use a font that supports emoji
            font_size = int(size * 0.4)
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Apple Color Emoji.ttc", font_size)
            except:
                font = ImageFont.load_default()
        
        # Draw white circle as background for emoji
        circle_size = int(size * 0.6)
        circle_pos = ((size - circle_size) // 2, (size - circle_size) // 2)
        draw.ellipse([circle_pos[0], circle_pos[1], 
                     circle_pos[0] + circle_size, circle_pos[1] + circle_size], 
                    fill='white')
        
        # Draw rocket (simplified - just a triangle)
        triangle_points = [
            (size // 2, size // 2 - size // 4),  # Top
            (size // 2 - size // 6, size // 2 + size // 6),  # Bottom left
            (size // 2 + size // 6, size // 2 + size // 6),  # Bottom right
        ]
        draw.polygon(triangle_points, fill='#2196F3')
        
        return img
    
    # Generate icons
    icon_192 = create_icon(192)
    icon_192.save('icon-192.png', 'PNG')
    print('✅ Generated icon-192.png')
    
    icon_512 = create_icon(512)
    icon_512.save('icon-512.png', 'PNG')
    print('✅ Generated icon-512.png')
    
except ImportError:
    print("Pillow not installed. Install it with: pip install Pillow")
    print("\nAlternatively, use generate-icons.html in your browser to generate the icons.")
except Exception as e:
    print(f"Error: {e}")
    print("\nYou can use generate-icons.html in your browser instead.")

