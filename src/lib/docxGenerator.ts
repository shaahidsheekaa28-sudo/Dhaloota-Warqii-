import {
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  ShadingType,
  BorderStyle,
  Packer,
  HeadingLevel
} from 'docx';
import { ScheduleWeek } from '../types';
import { APP_DOC_TITLE, AUTHOR_NAME, INTRO_TEXT, RULES_CALLOUT, INITIAL_STUDENTS, ADVICE_AND_NASIHA, MOTIVATIONAL_MESSAGES } from '../data/hifzData';

export async function generateDocxBuffer(
  weeks: ScheduleWeek[],
  options?: {
    title?: string;
    includeRules?: boolean;
    studentFilter?: string;
  }
): Promise<Buffer> {
  const docTitle = options?.title || APP_DOC_TITLE;
  const includeRules = options?.includeRules !== false;
  const filter = options?.studentFilter;

  const children: any[] = [];

  // --- Title ---
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: docTitle,
          font: 'Segoe UI',
          size: 32, // 16pt (half-points)
          bold: true,
          color: '1B365D',
        }),
      ],
    })
  );

  // --- Author Line ---
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 140 },
      children: [
        new TextRun({
          text: `Qopheessaa: ${AUTHOR_NAME}`,
          font: 'Segoe UI',
          size: 22, // 11pt
          bold: true,
          color: '00A896',
        }),
      ],
    })
  );

  // --- Intro Text ---
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 200 },
      children: [
        new TextRun({
          text: INTRO_TEXT,
          font: 'Segoe UI',
          size: 20, // 10pt
          color: '2B2D42',
        }),
      ],
    })
  );

  // --- Rules Callout Box ---
  if (includeRules) {
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: 'F4F6F8', type: ShadingType.CLEAR },
                borders: {
                  left: { style: BorderStyle.SINGLE, size: 24, color: '00A896' },
                  top: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                },
                margins: { top: 160, bottom: 160, left: 240, right: 240 },
                children: [
                  new Paragraph({
                    spacing: { after: 100 },
                    children: [
                      new TextRun({
                        text: RULES_CALLOUT.title,
                        bold: true,
                        font: 'Segoe UI',
                        size: 19,
                        color: '1B365D',
                      }),
                    ],
                  }),
                  ...RULES_CALLOUT.rules.map(
                    (rule) =>
                      new Paragraph({
                        spacing: { after: 60 },
                        children: [
                          new TextRun({
                            text: rule,
                            font: 'Segoe UI',
                            size: 17, // 8.5pt
                            color: '2B2D42',
                          }),
                        ],
                      })
                  ),
                ],
              }),
            ],
          }),
        ],
      })
    );

    children.push(
      new Paragraph({
        spacing: { after: 200 },
      })
    );
  }

  // --- Group Weeks by Month ---
  const hagayyaWeeks = weeks.filter((w) => w.monthKey === 'hagayya');
  const qaammeeWeeks = weeks.filter((w) => w.monthKey === 'qaammee_meskerem');
  const tikimtWeeks = weeks.filter((w) => w.monthKey === 'tikimt');

  // --- 19 Students 3-Month Overview Table ---
  const overviewHeaderRow = new TableRow({
    cantSplit: true,
    tableHeader: true,
    children: [
      'Lakk',
      'Maqaa Barataa',
      'Gosti Sagantaa',
      'Safara Guyyaatti',
      'Fuula Eegalloo (Hag 2)',
      'Fuula Baatii 3 Booda Gahan',
    ].map(
      (headerText) =>
        new TableCell({
          shading: { fill: '1B365D', type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: headerText,
                  font: 'Segoe UI',
                  bold: true,
                  size: 16,
                  color: 'FFFFFF',
                }),
              ],
            }),
          ],
        })
    ),
  });

  const filteredOverviewStudents = filter
    ? INITIAL_STUDENTS.filter((s) => s.name.toLowerCase() === filter.toLowerCase())
    : INITIAL_STUDENTS;

  const overviewDataRows = filteredOverviewStudents.map((st, i) => {
    const isAlt = i % 2 === 1;
    const cells = [
      String(i + 1),
      st.name,
      st.programType,
      st.dailyRate,
      `Fuula ${st.startHifzPage}`,
      `Fuula ${st.currentHifzPage}`,
    ];

    return new TableRow({
      cantSplit: true,
      children: cells.map((val, colIdx) => {
        return new TableCell({
          shading: isAlt ? { fill: 'F4F6F8', type: ShadingType.CLEAR } : undefined,
          borders: {
            bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
            top: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
          },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: colIdx === 1 ? AlignmentType.LEFT : AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: val,
                  font: 'Segoe UI',
                  size: 16,
                  bold: colIdx === 1 || colIdx === 5,
                  color: colIdx === 1 ? '1B365D' : colIdx === 2 ? '00A896' : '2B2D42',
                }),
              ],
            }),
          ],
        });
      }),
    });
  });

  children.push(
    new Paragraph({
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: "GABATEE DEEMSAA FI GA'EE BAATII 3 (HAGAYYAA 2 KAASEE)",
          font: 'Segoe UI',
          size: 26,
          bold: true,
          color: '1B365D',
        }),
      ],
    })
  );

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [overviewHeaderRow, ...overviewDataRows],
    })
  );

  children.push(new Paragraph({ spacing: { after: 200 } }));

  const renderSectionHeader = (titleText: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 100 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 8, color: '00A896' },
      },
      children: [
        new TextRun({
          text: titleText,
          font: 'Segoe UI',
          size: 22,
          bold: true,
          color: '1B365D',
        }),
      ],
    });
  };

  const renderWeekTable = (week: ScheduleWeek) => {
    // Filter rows if student filter active
    const filteredRows = filter
      ? week.rows.filter((r) => r.studentName.toLowerCase() === filter.toLowerCase())
      : week.rows;

    if (filteredRows.length === 0) return null;

    // Header Row
    const headerRow = new TableRow({
      cantSplit: true,
      tableHeader: true,
      children: week.headers.map(
        (headerText) =>
          new TableCell({
            shading: { fill: '1B365D', type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: headerText,
                    font: 'Segoe UI',
                    bold: true,
                    size: 17, // 8.5pt
                    color: 'FFFFFF',
                  }),
                ],
              }),
            ],
          })
      ),
    });

    // Data Rows
    const dataRows = filteredRows.map((rowData, rowIdx) => {
      const isAlt = Math.floor(rowIdx / 2) % 2 === 1; // Shading per student pair

      return new TableRow({
        cantSplit: true,
        children: rowData.values.map((cellVal, colIdx) => {
          let text = cellVal;
          if (colIdx === 0) text = rowData.studentName;
          if (colIdx === 1) text = rowData.type;

          return new TableCell({
            shading: isAlt ? { fill: 'F4F6F8', type: ShadingType.CLEAR } : undefined,
            borders: {
              bottom: { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
              top: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                alignment: colIdx >= 2 ? AlignmentType.CENTER : AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text,
                    font: 'Segoe UI',
                    size: 17, // 8.5pt
                    bold: colIdx === 0,
                    color: colIdx === 0 ? '1B365D' : colIdx === 1 ? '00A896' : '2B2D42',
                  }),
                ],
              }),
            ],
          });
        }),
      });
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [headerRow, ...dataRows],
    });
  };

  const renderMonthSection = (titleText: string, weekList: ScheduleWeek[]) => {
    if (weekList.length === 0) return;

    children.push(
      new Paragraph({
        spacing: { before: 280, after: 100 },
        children: [
          new TextRun({
            text: titleText,
            font: 'Segoe UI',
            size: 26,
            bold: true,
            color: '1B365D',
          }),
        ],
      })
    );

    for (const week of weekList) {
      children.push(renderSectionHeader(week.title));
      const tbl = renderWeekTable(week);
      if (tbl) children.push(tbl);
      children.push(new Paragraph({ spacing: { after: 120 } }));
    }
  };

  const monthKeys = Array.from(new Set(weeks.map((w) => w.monthKey)));
  for (let i = 0; i < monthKeys.length; i++) {
    const mKey = monthKeys[i];
    const mWeeks = weeks.filter((w) => w.monthKey === mKey);
    const mTitle = mWeeks[0]?.title.split(':')[0] || `JI'A ${i + 1}FFAA KAROORA BAATII`;
    renderMonthSection(mTitle, mWeeks);
  }

  // --- Advice & Nasiha Section ---
  children.push(
    new Paragraph({
      spacing: { before: 360, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '00A896' } },
      children: [
        new TextRun({
          text: ADVICE_AND_NASIHA.headerTitle,
          font: 'Segoe UI',
          size: 26,
          bold: true,
          color: '1B365D',
        }),
      ],
    })
  );

  if (ADVICE_AND_NASIHA.headerSubtitle) {
    children.push(
      new Paragraph({
        spacing: { after: 140 },
        children: [
          new TextRun({
            text: ADVICE_AND_NASIHA.headerSubtitle,
            font: 'Segoe UI',
            size: 18,
            italics: true,
            color: '00A896',
          }),
        ],
      })
    );
  }

  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `"${ADVICE_AND_NASIHA.quote}"`,
          font: 'Segoe UI',
          size: 18,
          italics: true,
          color: '1B365D',
        }),
      ],
    })
  );

  for (const sec of ADVICE_AND_NASIHA.sections) {
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 40 },
        children: [
          new TextRun({
            text: `${sec.number}. ${sec.title.replace(/^📌\s*\d+\.\s*/, '')} — `,
            font: 'Segoe UI',
            size: 20,
            bold: true,
            color: '1B365D',
          }),
          new TextRun({
            text: sec.cardTitle,
            font: 'Segoe UI',
            size: 20,
            bold: true,
            color: '00A896',
          }),
        ],
      })
    );
    children.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: sec.cardBody,
            font: 'Segoe UI',
            size: 18,
            color: '333333',
          }),
        ],
      })
    );
  }

  children.push(
    new Paragraph({
      spacing: { before: 200, after: 60 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: ADVICE_AND_NASIHA.duaa.title,
          font: 'Segoe UI',
          size: 20,
          bold: true,
          color: '00A896',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: ADVICE_AND_NASIHA.duaa.body,
          font: 'Segoe UI',
          size: 18,
          italics: true,
          color: '1B365D',
        }),
      ],
    })
  );

  // --- Motivational Section 1: Yaa Barataa Qur'aana, Garaa Jabaadhu! ---
  children.push(
    new Paragraph({
      spacing: { before: 300, after: 80 },
      children: [
        new TextRun({
          text: `🌟 ${MOTIVATIONAL_MESSAGES.quranStudent.title}`,
          font: 'Segoe UI',
          size: 22,
          bold: true,
          color: '1B365D',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `"${MOTIVATIONAL_MESSAGES.quranStudent.quote}"`,
          font: 'Segoe UI',
          size: 18,
          italics: true,
          color: '00A896',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: MOTIVATIONAL_MESSAGES.quranStudent.intro,
          font: 'Segoe UI',
          size: 18,
          color: '333333',
        }),
      ],
    })
  );

  for (const p of MOTIVATIONAL_MESSAGES.quranStudent.points) {
    children.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: `💡 ${p.title}: `,
            font: 'Segoe UI',
            size: 18,
            bold: true,
            color: '1B365D',
          }),
          new TextRun({
            text: p.body,
            font: 'Segoe UI',
            size: 18,
            color: '333333',
          }),
        ],
      })
    );
  }

  children.push(
    new Paragraph({
      spacing: { before: 100, after: 200 },
      children: [
        new TextRun({
          text: MOTIVATIONAL_MESSAGES.quranStudent.closing,
          font: 'Segoe UI',
          size: 18,
          bold: true,
          color: '00A896',
        }),
      ],
    })
  );

  // --- Motivational Section 2: Kaayyo Kee Bira Gahuuf Ka'i! ---
  children.push(
    new Paragraph({
      spacing: { before: 240, after: 80 },
      children: [
        new TextRun({
          text: `🎯 ${MOTIVATIONAL_MESSAGES.goalReaching.title}`,
          font: 'Segoe UI',
          size: 22,
          bold: true,
          color: '1B365D',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `"${MOTIVATIONAL_MESSAGES.goalReaching.quote}"`,
          font: 'Segoe UI',
          size: 18,
          italics: true,
          color: '00A896',
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: MOTIVATIONAL_MESSAGES.goalReaching.intro,
          font: 'Segoe UI',
          size: 18,
          color: '333333',
        }),
      ],
    })
  );

  for (const p of MOTIVATIONAL_MESSAGES.goalReaching.points) {
    children.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: `💡 ${p.title}: `,
            font: 'Segoe UI',
            size: 18,
            bold: true,
            color: '1B365D',
          }),
          new TextRun({
            text: p.body,
            font: 'Segoe UI',
            size: 18,
            color: '333333',
          }),
        ],
      })
    );
  }

  children.push(
    new Paragraph({
      spacing: { before: 100, after: 200 },
      children: [
        new TextRun({
          text: MOTIVATIONAL_MESSAGES.goalReaching.closing,
          font: 'Segoe UI',
          size: 18,
          bold: true,
          color: '00A896',
        }),
      ],
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 864, // 0.6 in
              bottom: 864,
              left: 864,
              right: 864,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
