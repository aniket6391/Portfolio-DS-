document.getElementById("resumeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect data
  const getValue = (id) => document.getElementById(id).value.trim();
  const name = getValue("name");
  const email = getValue("email");
  const phone = getValue("phone");
  const address = getValue("address");
  const linkedin = getValue("linkedin");
  const github = getValue("github");
  const portfolio = getValue("portfolio");
  const summary = getValue("summary");
  const education = getValue("education");
  const skills = getValue("skills");
  const certificates = getValue("certificates");
  const projects = getValue("projects");

  const toLines = (text) =>
    text.split("\n").map(line => line.trim()).filter(line => line).join("<br>");

  // Build resume HTML
  const resumeHTML = `
    <div id="resume" style="
      width:210mm;
      min-height:297mm;
      background:white;
      padding:15mm 18mm;
      box-sizing:border-box;
      font-family:'Poppins',sans-serif;
      color:#222;
      line-height:1.4;
      border:3px solid #004aad;
    ">
      <div style="border-bottom:2px solid #004aad;padding-bottom:6px;margin-bottom:8px;">
        <h1 style="margin:0;color:#004aad;font-size:26px;text-align:left;">${name}</h1>
      </div>

      <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p>
        ${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ""}
        ${github ? ` | <a href="${github}" target="_blank">GitHub</a>` : ""}
        ${portfolio ? ` | <a href="${portfolio}" target="_blank">Portfolio</a>` : ""}
      </p>

      <h2 style="color:#004aad;border-bottom:1px solid #004aad;">🧠 Profile Summary</h2>
      <p>${summary}</p>

      <h2 style="color:#004aad;border-bottom:1px solid #004aad;">🎓 Education</h2>
      <p>${toLines(education)}</p>

      <h2 style="color:#004aad;border-bottom:1px solid #004aad;">💡 Skills</h2>
      <p>${toLines(skills)}</p>

      <h2 style="color:#004aad;border-bottom:1px solid #004aad;">📜 Certificates</h2>
      <p>${toLines(certificates)}</p>

      <h2 style="color:#004aad;border-bottom:1px solid #004aad;">💼 Projects</h2>
      <p>${toLines(projects)}</p>
    </div>
  `;

  // Create a temporary hidden container for generating PDF
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = resumeHTML;
  tempContainer.style.position = "fixed";
  tempContainer.style.top = "-9999px";
  document.body.appendChild(tempContainer);

  // Load necessary libraries
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

  // Generate PDF
  const { jsPDF } = window.jspdf;
  const resume = tempContainer.querySelector("#resume");
  const canvas = await html2canvas(resume, { scale: 2 });
  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

  // Open PDF manually in a new tab (not download)
  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);
  window.open(pdfURL, "_blank");

  // Cleanup
  document.body.removeChild(tempContainer);
});

// Helper function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
