#!/usr/bin/env python3
"""
WorkBridge Internship Defense & Oral Examination Guide Generator
Generates both a comprehensive Markdown guide and a polished, professional PDF
with real-world analogies and deep technical explanations for all 100 defense questions.
"""

import os
import sys
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Define Palette
PRIMARY = colors.HexColor('#0F172A')       # Dark Slate / Navy
SECONDARY = colors.HexColor('#2563EB')     # Royal Blue
ACCENT_GREEN = colors.HexColor('#059669')  # Emerald
ANALOGY_BG = colors.HexColor('#F0FDF4')    # Soft Mint/Green Background
ANALOGY_BORDER = colors.HexColor('#10B981')# Green Accent Border
TEXT_DARK = colors.HexColor('#1E293B')     # Charcoal Text
TEXT_MUTED = colors.HexColor('#64748B')    # Gray Subtext
CARD_BG = colors.HexColor('#F8FAFC')       # Off-white / light slate
BORDER_COLOR = colors.HexColor('#E2E8F0')  # Light Gray Border

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # First page is title page, draw minimal footer only
            self.saveState()
            self.setFont("Helvetica", 8)
            self.setFillColor(TEXT_MUTED)
            self.drawRightString(612 - 36, 20, "WorkBridge Internship Defense Guide | Confidential")
            self.restoreState()
            return

        self.saveState()
        # Running Header
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(SECONDARY)
        self.drawString(36, 792 - 25, "WORKBRIDGE")
        self.setFont("Helvetica", 8)
        self.setFillColor(TEXT_MUTED)
        self.drawString(100, 792 - 25, "|  Internship Oral Defense & Analogy Examination Guide")
        
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(36, 792 - 30, 612 - 36, 792 - 30)

        # Running Footer
        self.line(36, 32, 612 - 36, 32)
        self.setFont("Helvetica", 8)
        self.setFillColor(TEXT_MUTED)
        self.drawString(36, 20, "Full-Stack Web & Mobile Engineering | Ethiopian Informal Sector Platform")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 36, 20, page_str)
        self.restoreState()

def create_analogy_box(analogy_text, styles, width=540):
    content = [
        Paragraph(f"<b>💡 Everyday Analogy:</b> {analogy_text}", styles['AnalogyText'])
    ]
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ANALOGY_BG),
        ('BOX', (0,0), (-1,-1), 1, ANALOGY_BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    return t

def create_tip_box(tip_text, styles, width=540):
    content = [
        Paragraph(f"<b>🎓 Defense Key Takeaway / What to Say:</b> {tip_text}", styles['TipText'])
    ]
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#EFF6FF')),
        ('BOX', (0,0), (-1,-1), 1, SECONDARY),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
    ]))
    return t

print("Helper definitions complete.")

