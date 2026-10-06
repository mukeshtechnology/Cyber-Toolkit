function startScan() {
    let ip = document.getElementById('ip').value;
    let scanType = document.getElementById('scanType').value;
    let resultsDiv = document.getElementById('results');
  
    resultsDiv.innerHTML = '';
  
    if (!ip || (!isValidIPv4(ip) && !isValidIPv6(ip))) {
        resultsDiv.innerHTML = "<h2 style='color: red;'>Error: Invalid IP address.</h2>";
        return;
    }
  
    resultsDiv.innerHTML = "<h2>Scanning " + ip + " (" + scanType + " scan)...</h2>";
  
    let portsToScan = [22, 80, 443, 21, 23, 8080];  
    let portNames = { 22: "SSH", 80: "HTTP", 443: "HTTPS", 21: "FTP", 23: "Telnet", 8080: "HTTP (Alternative)" };
    let ipVersion = isValidIPv4(ip) ? "IPv4" : isValidIPv6(ip) ? "IPv6" : "Unknown IP version";
  
    setTimeout(() => {
        resultsDiv.innerHTML = "<h3>Scan Complete</h3>";
        resultsDiv.innerHTML += "<p><strong>IP Version for " + ip + ":</strong> " + ipVersion + "</p>";
  
        resultsDiv.innerHTML += "<p>Scanning ports...</p>";
        let scanResults = "<ul>";
  
        portsToScan.forEach(port => {
            let isOpen = Math.random() > 0.5; 
  
            if (isOpen) {
                if (scanType === 'syn') {
                    scanResults += "<li>Port " + port + " - " + portNames[port] + " (Open, SYN response received)</li>";
                } else {
                    scanResults += "<li>Port " + port + " - " + portNames[port] + " (Open)</li>";
                }
            } else {
                scanResults += "<li>Port " + port + " - " + portNames[port] + " (Closed)</li>";
            }
        });
  
        scanResults += "</ul>";
        resultsDiv.innerHTML += scanResults;
    }, 1000); 
  }
  
  function isValidIPv4(ip) {
    const parts = ip.split('.'); 
    
    if (parts.length !== 4) {
        return false; 
    }

    for (let part of parts) {
        if (!/^\d+$/.test(part)) {
            return false; // 
        }

        const num = Number(part);
        if (num < 0 || num > 255) {
            return false; 
        }
    }

    return true; 
}

function isValidIPv6(ip) {
  const parts = ip.split(':');
  
  if (parts.length !== 8) {
      return false;
  }

  for (let part of parts) {
      if (part.length < 1 || part.length > 4) {
          return false; 
      }

      if (!/^[a-fA-F0-9]+$/.test(part)) {
          return false; 
      }
  }

  return true; 
}

  
  function toggleAbout() {
    const aboutSection = document.querySelector('.about-section');
    aboutSection.classList.toggle('active');
  }
  
  function clearResults() {
    let ip = document.getElementById('ip').value;
    let resultsDiv = document.getElementById('results');
  
    if (!ip) {
        resultsDiv.innerHTML = '';
    }
  }