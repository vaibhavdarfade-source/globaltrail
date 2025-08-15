document.getElementById('tripForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());

  const start = new Date(data.start);
  const end   = new Date(data.end);
  const days = Math.round((end - start) / 86400000) + 1;
  if (days <= 0) { alert('End date must be after start date'); return; }

  let plan = `Destination: ${data.destination}\nDates: ${data.start} → ${data.end} (${days} days)\n`;
  plan += `Style: ${data.style} | Budget: $${data.budget}/day\n\n`;

  const styles = {
    Relaxed: 2,
    Balanced: 3,
    Packed: 4
  };
  const actsPerDay = styles[data.style] || 2;

  const sampleActs = [
    "Morning café crawl",
    "Local market walk",
    "Museum / gallery",
    "Scenic hike",
    "Rooftop sunset",
    "Traditional dinner",
    "Shopping district",
    "Spa / wellness"
  ];

  for (let i = 0; i < days; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    plan += `Day ${i+1} – ${day.toDateString()}\n`;
    for (let j = 0; j < actsPerDay; j++) {
      plan += ` • ${sampleActs[(i*actsPerDay + j) % sampleActs.length]}\n`;
    }
    plan += '\n';
  }

  if (data.notes.trim()) plan += `Notes:\n${data.notes}\n`;

  const pre = document.querySelector('#output pre');
  pre.textContent = plan;
  document.getElementById('output').hidden = false;
  document.getElementById('output').scrollIntoView({behavior:'smooth'});
});
