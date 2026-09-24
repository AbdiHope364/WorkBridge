#!/usr/bin/env python3
"""
Master Builder for WorkBridge Internship Defense Analogy Guide.
Generates:
1. docs/internship-report/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.md
2. docs/internship-report/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.pdf
3. /home/hope/.gemini/antigravity/brain/64a9c667-5d91-457b-84a2-5d6659ef6794/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.pdf
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

# Import question parts
from questions_data_part1 import SECTIONS_PART1
from questions_data_part2 import SECTIONS_PART2

ALL_SECTIONS = SECTIONS_PART1 + SECTIONS_PART2

# Color Palette
PRIMARY = colors.HexColor('#0F172A')       # Dark Slate / Navy
SECONDARY = colors.HexColor('#2563EB')     # Royal Blue
ACCENT_GREEN = colors.HexColor('#059669')  # Emerald
ANALOGY_BG = colors.HexColor('#F0FDF4')    # Soft Mint/Green Background
ANALOGY_BORDER = colors.HexColor('#10B981')# Green Accent Border
TIP_BG = colors.HexColor('#EFF6FF')        # Soft Blue
TIP_BORDER = colors.HexColor('#3B82F6')    # Royal Blue Border
TEXT_DARK = colors.HexColor('#1E293B')     # Charcoal Text
TEXT_MUTED = colors.HexColor('#64748B')    # Gray Subtext
CARD_BG = colors.HexColor('#F8FAFC')       # Off-white / light slate
BORDER_COLOR = colors.HexColor('#CBD5E1')  # Light Gray Border
HEADER_BG = colors.HexColor('#1E293B')      # Dark Navy for Table Headers

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
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(SECONDARY)
            self.drawString(36, 20, "WORKBRIDGE INTERNSHIP DEFENSE")
            self.setFont("Helvetica", 8)
            self.setFillColor(TEXT_MUTED)
            self.drawString(185, 20, "|  100 Comprehensive Questions, Analogies & Technical Proofs")
            self.drawRightString(612 - 36, 20, f"Page 1 of {page_count}")
            self.restoreState()
            return

        self.saveState()
        # Running Header
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(SECONDARY)
        self.drawString(36, 792 - 25, "WORKBRIDGE")
        self.setFont("Helvetica", 8)
        self.setFillColor(TEXT_MUTED)
        self.drawString(100, 792 - 25, "|  Internship Oral Defense & Analogy Examination Handbook (100 Questions)")
        
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
        Paragraph(f"<b>💡 Real-World Analogy:</b> {analogy_text}", styles['AnalogyText'])
    ]
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ANALOGY_BG),
        ('BOX', (0,0), (-1,-1), 1, ANALOGY_BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    return t

def create_tip_box(tip_text, styles, width=540):
    content = [
        Paragraph(f"<b>🎓 Defense Key Takeaway / Elevator Pitch:</b> \"{tip_text}\"", styles['TipText'])
    ]
    t = Table([[content]], colWidths=[width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), TIP_BG),
        ('BOX', (0,0), (-1,-1), 1, TIP_BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    return t

def generate_markdown(output_md_path):
    print(f"Generating Markdown guide: {output_md_path}")
    lines = []
    lines.append("# WORKBRIDGE INTERNSHIP DEFENSE & ORAL EXAMINATION GUIDE")
    lines.append("## 100 Comprehensive Questions, Real-World Analogies & Deep Technical Explanations\n")
    lines.append("> **Candidate Role:** Lead Full-Stack Software Engineering Intern  ")
    lines.append("> **Project:** WorkBridge - Ethiopian Informal Labor Marketplace Platform  ")
    lines.append("> **Architecture:** Next.js 14 App Router, Express.js REST API, MongoDB/Mongoose, Turborepo Monorepo, Fayda e-KYC\n")
    lines.append("---\n")

    lines.append("## 📌 Executive Defense Strategy: How to Ace Your Oral Defense\n")
    lines.append("1. **Lead with the 'Why' & Everyday Analogy:** Advisors test if you truly understand the problem. Always give a 1-sentence real-world analogy first (e.g. *'JWT is like a tamper-proof concert wristband'*), then follow with the technical architecture.")
    lines.append("2. **Own Your Technical Choices:** Confidently defend why you chose Next.js (SSR/SEO), Express (lightweight control), MongoDB (flexible worker portfolios), and Turborepo (shared types and fast caching).")
    lines.append("3. **Be Transparent About Sandboxes:** Never claim you hooked up live Ethiopian banks with real money; proudly explain that you built a high-fidelity **payment and Fayda KYC sandbox** that validates end-to-end state machines.")
    lines.append("4. **Emphasize Local Socio-Economic Impact:** WorkBridge addresses a genuine Ethiopian problem—informal worker unemployment, safety risks, and middleman exploitation (0% worker commission).\n")
    lines.append("---\n")

    # Table of Contents
    lines.append("## 📋 Master Index of All 100 Questions by Category\n")
    all_qs = []
    for s in ALL_SECTIONS:
        lines.append(f"### {s['title']}")
        for q in s['questions']:
            all_qs.append(q)
            clean_title = q['q'].lower().replace(' ', '-').replace('?', '').replace('(', '').replace(')', '').replace('/', '').replace("'", "")
            lines.append(f"- **Q{q['id']}.** [{q['q']}](#q{q['id']}-{clean_title})")
        lines.append("")

    lines.append("---\n")

    lines.append("## 🌟 Top 10 High-Frequency Priority Questions (Cheat Sheet)\n")
    top_10_ids = [1, 2, 6, 8, 11, 21, 22, 31, 44, 51]
    for q_id in top_10_ids:
        item = next(q for q in all_qs if q['id'] == q_id)
        lines.append(f"### Q{item['id']}. {item['q']}")
        lines.append(f"- **💡 Analogy:** {item['analogy']}")
        lines.append(f"- **⚙️ Technical Core:** {item['explanation']}")
        lines.append(f"- **🎓 Elevator Pitch:** *\"{item['say']}\"*\n")

    lines.append("---\n")

    # Full 100 Questions by Section
    for section in ALL_SECTIONS:
        lines.append(f"## {section['title']}\n")
        lines.append(f"*{section['description']}*\n")
        
        for q in section['questions']:
            lines.append(f"### Q{q['id']}. {q['q']}\n")
            lines.append(f"> **💡 Real-World Analogy:**  \n> {q['analogy']}\n")
            lines.append(f"**⚙️ Technical Explanation:**  \n{q['explanation']}\n")
            lines.append(f"> **🎓 Defense Elevator Pitch:**  \n> *\"{q['say']}\"*\n")
            lines.append("---\n")

    with open(output_md_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print("Markdown guide written successfully.")

def generate_pdf(output_pdf_path):
    print(f"Generating PDF guide: {output_pdf_path}")
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=42,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    # Custom Typography Styles
    styles.add(ParagraphStyle(
        name='MainTitle',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY,
        alignment=0
    ))
    styles.add(ParagraphStyle(
        name='MainSubtitle',
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=SECONDARY,
        alignment=0
    ))
    styles.add(ParagraphStyle(
        name='MetaText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=TEXT_MUTED
    ))
    styles.add(ParagraphStyle(
        name='TOCSectionTitle',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=PRIMARY,
        spaceBefore=5,
        spaceAfter=2,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='TOCItem',
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=TEXT_DARK
    ))
    styles.add(ParagraphStyle(
        name='SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY,
        spaceBefore=12,
        spaceAfter=4,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='SectionDesc',
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_MUTED,
        spaceAfter=8,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='QuestionTitle',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=PRIMARY,
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='AnalogyText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#065F46')
    ))
    styles.add(ParagraphStyle(
        name='ExplanationText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_DARK,
        spaceBefore=3,
        spaceAfter=3
    ))
    styles.add(ParagraphStyle(
        name='TipText',
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#1E40AF')
    ))
    styles.add(ParagraphStyle(
        name='StrategyBoxText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=TEXT_DARK
    ))

    story = []

    # Title Banner
    banner_content = [
        [
            Paragraph("<b>WORKBRIDGE INTERNSHIP DEFENSE HANDBOOK</b>", styles['MainTitle']),
            Paragraph("<b>100 QUESTIONS WITH REAL-WORLD ANALOGIES & TECHNICAL EXPLANATIONS</b>", styles['MainSubtitle']),
            Spacer(1, 3),
            Paragraph("<b>Candidate Role:</b> Lead Full-Stack Engineering Intern &nbsp;|&nbsp; <b>Stack:</b> Next.js 14, Express, MongoDB, Turborepo, Fayda KYC, TypeScript", styles['MetaText']),
        ]
    ]
    banner_table = Table(banner_content, colWidths=[540])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1.5, SECONDARY),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 8))

    # Executive Strategy Box
    strat_text = (
        "<b>🎯 Master Defense Strategy for Academic & Industrial Advisors:</b><br/>"
        "• <b>Start with the Analogy:</b> Advisors test conceptual understanding. Giving a crisp real-world analogy first (e.g. <i>'JWT is like a concert wristband'</i>) proves that you truly understand how the system operates.<br/>"
        "• <b>Connect to Local Context:</b> Emphasize how WorkBridge is tailored for Ethiopia's informal economy with Fayda National ID verification and a 0% worker commission policy.<br/>"
        "• <b>Honest Engineering:</b> Proudly explain simulated gateways (Payment & Fayda sandbox) as robust architectural prototypes ready for live production API keys."
    )
    strat_table = Table([[Paragraph(strat_text, styles['StrategyBoxText'])]], colWidths=[540])
    strat_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FEF3C7')), # Light Amber
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#F59E0B')),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(strat_table)
    story.append(Spacer(1, 10))

    # Top 10 Priority Questions Cheat Sheet
    story.append(Paragraph("<b>🌟 Top 10 High-Frequency Priority Questions (Cheat Sheet)</b>", styles['SectionHeading']))
    top_10_ids = [1, 2, 6, 8, 11, 21, 22, 31, 44, 51]
    all_qs = []
    for s in ALL_SECTIONS:
        all_qs.extend(s['questions'])

    top_10_rows = [
        [
            Paragraph("<b># & Question</b>", styles['TOCSectionTitle']),
            Paragraph("<b>💡 Analogy & Elevator Pitch</b>", styles['TOCSectionTitle'])
        ]
    ]
    for q_id in top_10_ids:
        item = next(q for q in all_qs if q['id'] == q_id)
        top_10_rows.append([
            Paragraph(f"<b>Q{item['id']}</b><br/>{item['q']}", styles['TOCItem']),
            Paragraph(f"<b>Analogy:</b> {item['analogy'][:140]}...<br/><b>Pitch:</b> <i>\"{item['say']}\"</i>", styles['TOCItem'])
        ])
    
    top_10_table = Table(top_10_rows, colWidths=[200, 340])
    top_10_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#E2E8F0')),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(top_10_table)
    story.append(Spacer(1, 12))

    # Master Table of Contents (All 100 Questions)
    story.append(PageBreak())
    story.append(Paragraph("<b>📋 Complete Master Index of All 100 Questions</b>", styles['MainTitle']))
    story.append(Paragraph("Organized across 10 core engineering and domain areas", styles['MetaText']))
    story.append(Spacer(1, 8))

    # Build 2-column TOC Table
    toc_cells = []
    for s in ALL_SECTIONS:
        sec_text = f"<b>{s['title']}</b><br/>"
        for q in s['questions']:
            sec_text += f"• <b>Q{q['id']}:</b> {q['q']}<br/>"
        toc_cells.append(Paragraph(sec_text, styles['TOCItem']))

    # Split into 2 columns
    col1 = toc_cells[:5]
    col2 = toc_cells[5:]
    toc_table_data = []
    for c1, c2 in zip(col1, col2):
        toc_table_data.append([c1, c2])

    toc_table = Table(toc_table_data, colWidths=[265, 265])
    toc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(toc_table)
    story.append(PageBreak())

    # Render All 10 Detailed Sections
    total_q_rendered = 0
    for section_idx, section in enumerate(ALL_SECTIONS):
        if section_idx > 0:
            story.append(HRFlowable(width="100%", thickness=1, color=BORDER_COLOR, spaceBefore=8, spaceAfter=8))
        
        sec_header = [
            Paragraph(f"<b>{section['title']}</b>", styles['SectionHeading']),
            Paragraph(section['description'], styles['SectionDesc'])
        ]
        story.extend(sec_header)

        for q in section['questions']:
            q_flowables = []
            q_flowables.append(Paragraph(f"<b>Q{q['id']}. {q['q']}</b>", styles['QuestionTitle']))
            q_flowables.append(create_analogy_box(q['analogy'], styles))
            q_flowables.append(Spacer(1, 3))
            q_flowables.append(Paragraph(f"<b>⚙️ Technical Breakdown:</b> {q['explanation']}", styles['ExplanationText']))
            q_flowables.append(Spacer(1, 2))
            q_flowables.append(create_tip_box(q['say'], styles))
            q_flowables.append(Spacer(1, 7))

            story.append(KeepTogether(q_flowables))
            total_q_rendered += 1

    print(f"Building PDF document with {total_q_rendered} questions...")
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF build complete.")

def main():
    md_path = "/home/hope/WORKBRIDGE/WorkBridge/docs/internship-report/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.md"
    pdf_path = "/home/hope/WORKBRIDGE/WorkBridge/docs/internship-report/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.pdf"
    artifact_pdf_path = "/home/hope/.gemini/antigravity/brain/64a9c667-5d91-457b-84a2-5d6659ef6794/WORKBRIDGE_DEFENSE_ANALOGY_GUIDE.pdf"

    generate_markdown(md_path)
    generate_pdf(pdf_path)

    # Copy to artifact folder
    print(f"Copying PDF to artifact directory: {artifact_pdf_path}")
    shutil.copyfile(pdf_path, artifact_pdf_path)
    print("Artifact copy successful!")

if __name__ == '__main__':
    main()
