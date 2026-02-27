import PDFDocument from 'pdfkit';
import type { Response } from 'express';

export async function generateLandlordBrochure(res: Response) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
    info: {
      Title: 'Svnteen The Residency — Corporate Lease Information',
      Author: 'Svnteen The Residency',
      Subject: 'Commercial Lease Arrangement for Landlords',
      Keywords: 'commercial lease, fixed yield, serviced accommodation, R2SA',
    },
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Svnteen-Landlord-Brochure.pdf"');
  doc.pipe(res);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0A0A0A');
  doc.rect(0, 0, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica')
     .fontSize(10)
     .fillColor('#C9A84C')
     .text('SVNTEEN THE RESIDENCY', 60, 80, { characterSpacing: 4 });

  doc.font('Helvetica-Bold')
     .fontSize(36)
     .fillColor('#F5F0E8')
     .text('The Corporate\nLease\nArrangement', 60, 120, { lineGap: 8 });

  doc.font('Helvetica')
     .fontSize(14)
     .fillColor('#A09880')
     .text('A fixed-income alternative to standard\nresidential tenancies — designed for\nthe post-Reform Act landscape.', 60, 260, { lineGap: 4 });

  doc.rect(60, 340, 480, 1).fill('#2A2A2A');

  const pillars = [
    { label: 'FIXED CORPORATE YIELD', value: 'Monthly fixed payment from corporate budget' },
    { label: 'ZERO VOID EXPOSURE', value: 'We absorb 100% of the market risk' },
    { label: 'OUTSIDE REFORM ACT', value: 'Commercial lease — not residential tenancy' },
  ];

  pillars.forEach((pillar, i) => {
    const y = 360 + i * 60;
    doc.rect(60, y, 4, 40).fill('#C9A84C');
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#C9A84C').text(pillar.label, 76, y + 6, { characterSpacing: 1.5 });
    doc.font('Helvetica').fontSize(10).fillColor('#A09880').text(pillar.value, 76, y + 22);
  });

  doc.rect(0, doc.page.height - 6, doc.page.width, 6).fill('#C9A84C');
  doc.font('Helvetica').fontSize(9).fillColor('#5A5040')
     .text('svnteen.residency  ·  Commercial Lease Division  ·  Confidential', 60, doc.page.height - 30, { align: 'center' });

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0A0A0A');
  doc.rect(0, 0, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica').fontSize(9).fillColor('#C9A84C').text('THE CHALLENGE FACING LANDLORDS', 60, 60, { characterSpacing: 3 });

  doc.font('Helvetica-Bold').fontSize(24).fillColor('#F5F0E8')
     .text('The Renters Reform Act\nchanges everything.', 60, 90, { lineGap: 6, characterSpacing: 0 });

  doc.rect(60, 170, 480, 1).fill('#2A2A2A');

  const reforms = [
    { title: 'Section 21 Abolished', body: 'You can no longer reclaim your property without proving grounds. Expect 12-24 month county court timelines.' },
    { title: 'No More Fixed-Term ASTs', body: 'All tenancies become periodic by default. Tenants can leave with 2 months notice at any point.' },
    { title: 'Rent Increase Restrictions', body: 'Limited to once per year and challengeable at tribunal. Your income is no longer fully in your control.' },
    { title: 'Mandatory Ombudsman', body: 'All landlords must register with a government-approved ombudsman scheme — compliance cost and admin.' },
    { title: 'Stronger Tenant Rights', body: 'Tenants have expanded rights around pets, property condition, and anti-discrimination protections.' },
  ];

  reforms.forEach((reform, i) => {
    const y = 190 + i * 72;
    doc.rect(60, y, 480, 60).fill('#141414');
    doc.rect(60, y, 3, 60).fill('#e05555');
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#F5F0E8').text(reform.title, 76, y + 12);
    doc.font('Helvetica').fontSize(9).fillColor('#A09880').text(reform.body, 76, y + 30, { width: 450, lineGap: 3 });
  });

  doc.font('Helvetica-Bold').fontSize(11).fillColor('#C9A84C')
     .text('Commercial leases are not subject to the Renters Reform Act.', 60, 565);
  doc.font('Helvetica').fontSize(10).fillColor('#A09880')
     .text('When your tenant is a registered company — not a private individual — the residential legislation does not apply. This is the legal distinction that underpins our entire model.', 60, 585, { width: 480, lineGap: 4 });

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0A0A0A');
  doc.rect(0, 0, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica').fontSize(9).fillColor('#C9A84C').text('THREE REASONS TO CHOOSE A CORPORATE LEASE', 60, 60, { characterSpacing: 3 });

  const angles = [
    {
      number: '01',
      title: 'Fixed Corporate Yield',
      subtitle: 'The Financial Angle',
      body: 'Unlike a standard residential AST where your income fluctuates with void periods and tenant arrears, we sign a Commercial Lease. This provides you with a Fixed Corporate Yield every month for the next 3 years. It transforms your property from a volatile rental into a stable, fixed-income asset.\n\nKey benefits: Fixed monthly payment regardless of our occupancy. Commercial contract governed by business law, not residential tenancy law. 3-year term with structured, agreed break clauses.',
    },
    {
      number: '02',
      title: 'Corporate Operating Budget',
      subtitle: 'The Reliability Angle',
      body: 'If a normal tenant loses their job or becomes ill, your rent stops. With Svnteen Residency, your income isn\'t reliant on one person\'s paycheck. The lease is underwritten by our corporate operating budget.\n\nWhether our guests are in the property for 5 days or 30 days in any given month, your commercial lease dictates that our company pays the fixed amount. Your income is divorced from the volatility of the short-let market.',
    },
    {
      number: '03',
      title: 'Zero Void Exposure',
      subtitle: 'The Risk Management Angle',
      body: 'Our model completely removes your exposure to the retail rental market. Because we are your sole commercial tenant, we absorb 100% of the void risk. You don\'t need to worry about finding new tenants every 12 months or losing a month\'s income while the property sits empty between occupants.\n\nWe are your one tenant. Whether the property has guests or not is entirely our problem — and our opportunity.',
    },
  ];

  angles.forEach((angle, i) => {
    const y = 90 + i * 205;
    doc.rect(60, y, 480, 190).fill('#141414');
    doc.rect(60, y, 4, 190).fill('#C9A84C');
    doc.font('Helvetica').fontSize(20).fillColor('#C9A84C').text(angle.number, 76, y + 15, { characterSpacing: 0 });
    doc.font('Helvetica').fontSize(8).fillColor('#A09880').text(angle.subtitle.toUpperCase(), 76, y + 50, { characterSpacing: 2 });
    doc.font('Helvetica-Bold').fontSize(14).fillColor('#F5F0E8').text(angle.title, 76, y + 66, { characterSpacing: 0 });
    doc.rect(76, y + 88, 440, 1).fill('#2A2A2A');
    doc.font('Helvetica').fontSize(9).fillColor('#A09880').text(angle.body, 76, y + 100, { width: 440, lineGap: 4, characterSpacing: 0 });
  });

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0A0A0A');
  doc.rect(0, 0, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica').fontSize(9).fillColor('#C9A84C').text('THE PROCESS', 60, 60, { characterSpacing: 3 });
  doc.font('Helvetica-Bold').fontSize(24).fillColor('#F5F0E8').text('From enquiry to lease signed\nin 7-14 working days.', 60, 85, { lineGap: 6, characterSpacing: 0 });
  doc.rect(60, 150, 480, 1).fill('#2A2A2A');

  const steps = [
    { num: '01', title: 'Initial Conversation', body: 'We discuss your property and confirm it meets our criteria for short-let commercial use. No pressure, no commitment at this stage.', time: 'Day 1-2' },
    { num: '02', title: 'Property Assessment', body: 'We visit or conduct a virtual walkthrough. We confirm the rental figure, lease term, and break clause structure to suit both parties.', time: 'Day 3-5' },
    { num: '03', title: 'Commercial Lease Drafted', body: 'Our commercial lease is drawn up. You are strongly encouraged — and we welcome — having your own solicitor review it independently.', time: 'Day 5-10' },
    { num: '04', title: 'Property Setup', body: 'We fund and manage the entire fit-out — professional furniture, hotel linen, photography, and platform listing. Zero cost to you.', time: 'Day 10-14' },
    { num: '05', title: 'Lease Commences', body: 'Your Fixed Corporate Yield lands on day 1 of each calendar month. Same amount, every month, for the full term of the lease.', time: 'Ongoing' },
  ];

  steps.forEach((step, i) => {
    const y = 170 + i * 90;
    doc.circle(75, y + 20, 14).lineWidth(1).fillAndStroke('#1A1200', '#C9A84C');
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#C9A84C').text(step.num, 67, y + 16);
    if (i < steps.length - 1) {
      doc.save();
      doc.moveTo(75, y + 35).lineTo(75, y + 90).lineWidth(1).stroke('#2A2A2A');
      doc.restore();
    }
    doc.font('Helvetica').fontSize(8).fillColor('#5A5040').text(step.time.toUpperCase(), 100, y + 8, { characterSpacing: 1 });
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#F5F0E8').text(step.title, 100, y + 22, { characterSpacing: 0 });
    doc.font('Helvetica').fontSize(9).fillColor('#A09880').text(step.body, 100, y + 40, { width: 420, lineGap: 3 });
  });

  doc.addPage();
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0A0A0A');
  doc.rect(0, 0, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica').fontSize(9).fillColor('#C9A84C').text('COMMON QUESTIONS', 60, 60, { characterSpacing: 3 });
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#F5F0E8').text('What landlords ask us most.', 60, 85, { characterSpacing: 0 });
  doc.rect(60, 115, 480, 1).fill('#2A2A2A');

  const keyFAQs = [
    { q: 'Is this legal?', a: 'Completely. Commercial leases have been used in property for decades. We encourage all landlords to take independent legal advice — we welcome and support this.' },
    { q: 'Does my mortgage lender need to know?', a: 'If you have a residential mortgage, yes — you need consent to change to commercial use. Many specialist BTL lenders permit SA use. We can assist with the documentation they require.' },
    { q: 'What if you cannot pay one month?', a: 'We pay from a corporate operating budget, not a personal paycheck. Our income comes from multiple properties simultaneously. In the unlikely event of business disruption, commercial contract law applies.' },
    { q: 'Can I get my property back if I need it?', a: 'Yes. Every lease includes a mutual break clause, typically exercisable after year one with 2-3 months written notice. This is negotiated individually with each landlord.' },
    { q: 'Who pays the bills?', a: 'We do. Council tax, electricity, gas, water, and broadband are transferred into our name for the duration of the lease. You receive a net, clean fixed yield.' },
    { q: 'What will you do to my property?', a: 'We furnish it to a high standard at our own cost. At lease end, all furniture is removed and the property is returned to you in the condition received (fair wear and tear accepted).' },
  ];

  keyFAQs.forEach((faq, i) => {
    const y = 130 + i * 80;
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#F5F0E8').text(faq.q, 60, y, { width: 480 });
    doc.font('Helvetica').fontSize(9).fillColor('#A09880').text(faq.a, 60, y + 18, { width: 480, lineGap: 3 });
    if (i < keyFAQs.length - 1) doc.rect(60, y + 65, 480, 0.5).fill('#1C1C1C');
  });

  doc.rect(60, 640, 480, 130).fill('#141414');
  doc.rect(60, 640, 4, 130).fill('#C9A84C');
  doc.font('Helvetica').fontSize(9).fillColor('#C9A84C').text('SPEAK TO US DIRECTLY', 76, 658, { characterSpacing: 2 });
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#F5F0E8').text('No forms. No waiting.', 76, 678, { characterSpacing: 0 });
  doc.font('Helvetica').fontSize(10).fillColor('#A09880')
     .text('WhatsApp our team for a no-obligation conversation about your property.', 76, 702, { width: 440 });
  doc.font('Helvetica-Bold').fontSize(11).fillColor('#25D366')
     .text(`wa.me/${process.env.WHATSAPP_NUMBER || '447700000000'}`, 76, 728);
  doc.font('Helvetica').fontSize(9).fillColor('#A09880')
     .text('svnteen.residency/landlords  ·  Respond within 2 business hours', 76, 748);

  doc.rect(0, doc.page.height - 6, doc.page.width, 6).fill('#C9A84C');

  doc.font('Helvetica').fontSize(7).fillColor('#3A3020')
     .text('Svnteen The Residency. This document is for information purposes only and does not constitute a contract, financial advice, or legal advice. All arrangements are subject to individual negotiation and independent legal review. We recommend all landlords obtain independent legal and financial advice before entering any commercial lease arrangement.', 60, doc.page.height - 50, { width: 480, lineGap: 2 });

  doc.end();
}
