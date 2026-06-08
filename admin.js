// Admin Dashboard controller logic for Nocode Savvy

let sbClient = null;

// Initialize Supabase Client if credentials exist
function initSupabase() {
  const url = localStorage.getItem("sb_url");
  const key = localStorage.getItem("sb_key");
  const badge = document.getElementById("storage-status-badge");

  if (url && key && window.supabase) {
    try {
      sbClient = window.supabase.createClient(url, key);
      badge.textContent = "Supabase Connected";
      badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      return true;
    } catch (e) {
      console.error("Supabase client init failed:", e);
    }
  }

  sbClient = null;
  badge.textContent = "LocalStorage Only";
  badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20";
  return false;
}

// Global Database API wrapper
const db = {
  // Projects Operations
  async getProjects() {
    if (sbClient) {
      const { data, error } = await sbClient.from("projects").select("*").order("created_at", { ascending: false });
      if (!error) return data;
      console.warn("Supabase load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_projects");
    return local ? JSON.parse(local) : [];
  },
  async saveProject(project) {
    if (sbClient) {
      let result;
      if (project.id) {
        result = await sbClient.from("projects").update(project).eq("id", project.id);
      } else {
        delete project.id;
        result = await sbClient.from("projects").insert([project]);
      }
      if (!result.error) return true;
      console.warn("Supabase save failed, falling back to LocalStorage:", result.error);
    }
    // LocalStorage fallback
    const projects = await this.getProjects();
    if (project.id) {
      const idx = projects.findIndex(p => p.id === project.id);
      if (idx !== -1) projects[idx] = project;
    } else {
      project.id = crypto.randomUUID();
      project.created_at = new Date().toISOString();
      projects.unshift(project);
    }
    localStorage.setItem("db_projects", JSON.stringify(projects));
    return true;
  },
  async deleteProject(id) {
    if (sbClient) {
      const { error } = await sbClient.from("projects").delete().eq("id", id);
      if (!error) return true;
      console.warn("Supabase delete failed, falling back to LocalStorage:", error);
    }
    const projects = await this.getProjects();
    const updated = projects.filter(p => p.id !== id);
    localStorage.setItem("db_projects", JSON.stringify(updated));
    return true;
  },

  // Testimonials Operations
  async getTestimonials() {
    if (sbClient) {
      const { data, error } = await sbClient.from("testimonials").select("*").order("created_at", { ascending: false });
      if (!error) return data;
      console.warn("Supabase load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_testimonials");
    return local ? JSON.parse(local) : [];
  },
  async saveTestimonial(testimonial) {
    if (sbClient) {
      let result;
      if (testimonial.id) {
        result = await sbClient.from("testimonials").update(testimonial).eq("id", testimonial.id);
      } else {
        delete testimonial.id;
        result = await sbClient.from("testimonials").insert([testimonial]);
      }
      if (!result.error) return true;
      console.warn("Supabase save failed, falling back to LocalStorage:", result.error);
    }
    const testimonials = await this.getTestimonials();
    if (testimonial.id) {
      const idx = testimonials.findIndex(t => t.id === testimonial.id);
      if (idx !== -1) testimonials[idx] = testimonial;
    } else {
      testimonial.id = crypto.randomUUID();
      testimonial.created_at = new Date().toISOString();
      testimonials.unshift(testimonial);
    }
    localStorage.setItem("db_testimonials", JSON.stringify(testimonials));
    return true;
  },
  async deleteTestimonial(id) {
    if (sbClient) {
      const { error } = await sbClient.from("testimonials").delete().eq("id", id);
      if (!error) return true;
      console.warn("Supabase delete failed, falling back to LocalStorage:", error);
    }
    const testimonials = await this.getTestimonials();
    const updated = testimonials.filter(t => t.id !== id);
    localStorage.setItem("db_testimonials", JSON.stringify(updated));
    return true;
  },

  // About Me Operations
  async getAboutInfo() {
    if (sbClient) {
      const { data, error } = await sbClient.from("about_me").select("*").eq("key", "profile_info").single();
      if (!error && data) return data.value;
      console.warn("Supabase load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_about_me");
    return local ? JSON.parse(local) : {
      name: "Emmanuel Ajibewe",
      tagline: "Systems-led product engineer",
      bio1: "I'm a systems-led product engineer. I design and build production-grade SaaS platforms, visually robust Bubble apps, custom APIs, and scalable databases.",
      bio2: "With years of product engineering experience, I specialize in bridging the gap between visually striking frontend designs and efficient, high-availability database architectures."
    };
  },
  async saveAboutInfo(info) {
    if (sbClient) {
      const { error } = await sbClient.from("about_me").upsert({ key: "profile_info", value: info, updated_at: new Date().toISOString() });
      if (!error) return true;
      console.warn("Supabase save failed, falling back to LocalStorage:", error);
    }
    localStorage.setItem("db_about_me", JSON.stringify(info));
    return true;
  },

  // Bugs / Changelog Operations
  async getBugs() {
    if (sbClient) {
      const { data, error } = await sbClient.from("bugs").select("*").order("created_at", { ascending: false });
      if (!error) return data;
      console.warn("Supabase load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_bugs");
    return local ? JSON.parse(local) : [];
  },
  async saveBug(bug) {
    if (sbClient) {
      let result;
      if (bug.id) {
        result = await sbClient.from("bugs").update(bug).eq("id", bug.id);
      } else {
        delete bug.id;
        result = await sbClient.from("bugs").insert([bug]);
      }
      if (!result.error) return true;
      console.warn("Supabase save failed, falling back to LocalStorage:", result.error);
    }
    const bugs = await this.getBugs();
    if (bug.id) {
      const idx = bugs.findIndex(b => b.id === bug.id);
      if (idx !== -1) bugs[idx] = bug;
    } else {
      bug.id = crypto.randomUUID();
      bug.created_at = new Date().toISOString();
      bugs.unshift(bug);
    }
    localStorage.setItem("db_bugs", JSON.stringify(bugs));
    return true;
  },
  async deleteBug(id) {
    if (sbClient) {
      const { error } = await sbClient.from("bugs").delete().eq("id", id);
      if (!error) return true;
      console.warn("Supabase delete failed, falling back to LocalStorage:", error);
    }
    const bugs = await this.getBugs();
    const updated = bugs.filter(b => b.id !== id);
    localStorage.setItem("db_bugs", JSON.stringify(updated));
    return true;
  }
};

// Login Check and Auth logic
const DEFAULT_PASSWORD = "savvyadmin";

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const pwd = document.getElementById("password").value;
  if (pwd === DEFAULT_PASSWORD || pwd === localStorage.getItem("admin_custom_password")) {
    localStorage.setItem("admin_logged_in", "true");
    document.getElementById("login-overlay").classList.add("hidden");
    document.getElementById("dashboard-content").classList.remove("hidden");
    initDashboard();
  } else {
    document.getElementById("login-error").classList.remove("hidden");
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("admin_logged_in");
  location.reload();
});

// Check auth state on load
window.addEventListener("load", () => {
  if (localStorage.getItem("admin_logged_in") === "true") {
    document.getElementById("login-overlay").classList.add("hidden");
    document.getElementById("dashboard-content").classList.remove("hidden");
    initDashboard();
  }
});

// Tabs switching logic
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.add("hidden"));
    
    btn.classList.add("active");
    const activeTab = btn.getAttribute("data-tab");
    document.getElementById(`tab-${activeTab}`).classList.remove("hidden");
  });
});

// Theme toggle configuration for admin dashboard
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-sun-icon");
  const moonIcon = document.getElementById("theme-moon-icon");

  let currentTheme = localStorage.getItem("ncs-theme") || 
                     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.classList.add(currentTheme);
  updateIcons(currentTheme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
    localStorage.setItem("ncs-theme", nextTheme);
    updateIcons(nextTheme);
  });

  function updateIcons(theme) {
    if (theme === "dark") {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  }
}

// Background Canvas (identical animation loop as main.js for consistent branding)
function initBackgroundCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  let particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.15),
      vy: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.15),
      radius: 1 + Math.random() * 1.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Dashboard Initializer
async function initDashboard() {
  initTheme();
  initBackgroundCanvas();
  initSupabase();
  
  // Fill values in Supabase Config form
  document.getElementById("sb-url").value = localStorage.getItem("sb_url") || "";
  document.getElementById("sb-key").value = localStorage.getItem("sb_key") || "";

  // Set up forms & event listeners
  setupDatabaseConfig();
  setupProjectsManager();
  setupTestimonialsManager();
  setupAboutManager();
  setupBugsManager();
  setupBackupRestore();

  // Load active count stats
  updateStats();
}

// Update Dashboard Statistics Card
async function updateStats() {
  const proj = await db.getProjects();
  const test = await db.getTestimonials();
  const bugs = await db.getBugs();

  document.getElementById("stat-projects").textContent = proj.length;
  document.getElementById("stat-testimonials").textContent = test.length;
  document.getElementById("stat-bugs").textContent = bugs.filter(b => b.status !== "Resolved").length;
}

// 1. Supabase Database configuration handlers
function setupDatabaseConfig() {
  const form = document.getElementById("db-config-form");
  const disconnect = document.getElementById("sb-disconnect");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.getElementById("sb-url").value.trim();
    const key = document.getElementById("sb-key").value.trim();

    localStorage.setItem("sb_url", url);
    localStorage.setItem("sb_key", key);

    if (initSupabase()) {
      alert("Successfully connected to Supabase!");
      updateStats();
      location.reload();
    } else {
      alert("Supabase integration details saved, but connection failed. Make sure URL and Keys are valid.");
    }
  });

  disconnect.addEventListener("click", () => {
    localStorage.removeItem("sb_url");
    localStorage.removeItem("sb_key");
    initSupabase();
    alert("Supabase disconnected. Falling back to local storage.");
    location.reload();
  });
}

// 2. Projects Manager Implementation
async function setupProjectsManager() {
  const form = document.getElementById("project-form");
  const body = document.getElementById("projects-list-body");
  const addBtn = document.getElementById("add-project-btn");
  const cancelBtn = document.getElementById("cancel-project-btn");

  const renderProjects = async () => {
    const list = await db.getProjects();
    body.innerHTML = "";
    if (list.length === 0) {
      body.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-muted-foreground">No custom projects loaded.</td></tr>`;
      return;
    }
    list.forEach(p => {
      const tr = document.createElement("tr");
      tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
      tr.innerHTML = `
        <td class="p-4">
          <div class="font-bold text-base">${p.title}</div>
          <div class="text-xs text-muted-foreground mt-1 line-clamp-1">${p.description}</div>
        </td>
        <td class="p-4 text-muted-foreground font-mono text-xs">${p.category}</td>
        <td class="p-4 text-muted-foreground font-mono text-xs">${p.year}</td>
        <td class="p-4">
          <div class="flex gap-2">
            <button class="edit-p-btn text-xs font-semibold hover:text-primary transition" data-id="${p.id}">Edit</button>
            <button class="delete-p-btn text-xs font-semibold text-destructive hover:opacity-85 transition" data-id="${p.id}">Delete</button>
          </div>
        </td>
      `;
      body.appendChild(tr);
    });

    // Wire up delete and edit event listeners
    document.querySelectorAll(".delete-p-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this project?")) {
          await db.deleteProject(btn.getAttribute("data-id"));
          renderProjects();
          updateStats();
        }
      });
    });

    document.querySelectorAll(".edit-p-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = list.find(p => p.id === id);
        if (item) {
          document.getElementById("project-id").value = item.id;
          document.getElementById("project-title").value = item.title;
          document.getElementById("project-category").value = item.category;
          document.getElementById("project-year").value = item.year;
          document.getElementById("project-link").value = item.link || "";
          document.getElementById("project-tags").value = (item.tags || []).join(", ");
          document.getElementById("project-description").value = item.description;

          document.getElementById("project-form-title").textContent = "Edit Project Info";
          form.classList.remove("hidden");
        }
      });
    });
  };

  addBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("project-id").value = "";
    document.getElementById("project-form-title").textContent = "New Project Details";
    form.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    form.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const project = {
      id: document.getElementById("project-id").value || undefined,
      title: document.getElementById("project-title").value.trim(),
      category: document.getElementById("project-category").value.trim(),
      year: document.getElementById("project-year").value.trim(),
      link: document.getElementById("project-link").value.trim() || undefined,
      tags: document.getElementById("project-tags").value.split(",").map(t => t.trim()).filter(t => t.length > 0),
      description: document.getElementById("project-description").value.trim()
    };
    await db.saveProject(project);
    form.classList.add("hidden");
    renderProjects();
    updateStats();
  });

  renderProjects();
}

// 3. Testimonials Manager Implementation
async function setupTestimonialsManager() {
  const form = document.getElementById("testimonial-form");
  const grid = document.getElementById("testimonials-list-grid");
  const addBtn = document.getElementById("add-testimonial-btn");
  const cancelBtn = document.getElementById("cancel-testimonial-btn");

  const renderTestimonials = async () => {
    const list = await db.getTestimonials();
    grid.innerHTML = "";
    if (list.length === 0) {
      grid.innerHTML = `<div class="col-span-2 text-center text-muted-foreground p-8 admin-card">No testimonials logged yet.</div>`;
      return;
    }
    list.forEach(t => {
      const card = document.createElement("div");
      card.className = "p-6 admin-card space-y-4 relative flex flex-col justify-between";
      card.innerHTML = `
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            ${t.image_url ? `<img src="${t.image_url}" class="h-10 w-10 rounded-full object-cover">` : `<div class="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold font-display">${t.client_name.substring(0,2).toUpperCase()}</div>`}
            <div>
              <div class="font-bold">${t.client_name}</div>
              <div class="text-xs text-muted-foreground">${t.company_role}</div>
            </div>
          </div>
          <p class="text-sm text-muted-foreground italic">"${t.review_text}"</p>
        </div>
        <div class="flex gap-3 pt-3 border-t border-foreground/5">
          <button class="edit-t-btn text-xs font-semibold hover:text-primary transition" data-id="${t.id}">Edit</button>
          <button class="delete-t-btn text-xs font-semibold text-destructive hover:opacity-85 transition" data-id="${t.id}">Delete</button>
        </div>
      `;
      grid.appendChild(card);
    });

    document.querySelectorAll(".delete-t-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
          await db.deleteTestimonial(btn.getAttribute("data-id"));
          renderTestimonials();
          updateStats();
        }
      });
    });

    document.querySelectorAll(".edit-t-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = list.find(t => t.id === id);
        if (item) {
          document.getElementById("testimonial-id").value = item.id;
          document.getElementById("client-name").value = item.client_name;
          document.getElementById("company-role").value = item.company_role;
          document.getElementById("client-image-url").value = item.image_url || "";
          document.getElementById("review-text").value = item.review_text;

          document.getElementById("testimonial-form-title").textContent = "Edit Testimonial Details";
          form.classList.remove("hidden");
        }
      });
    });
  };

  addBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("testimonial-id").value = "";
    document.getElementById("testimonial-form-title").textContent = "New Testimonial Details";
    form.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    form.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const testimonial = {
      id: document.getElementById("testimonial-id").value || undefined,
      client_name: document.getElementById("client-name").value.trim(),
      company_role: document.getElementById("company-role").value.trim(),
      image_url: document.getElementById("client-image-url").value.trim() || undefined,
      review_text: document.getElementById("review-text").value.trim()
    };
    await db.saveTestimonial(testimonial);
    form.classList.add("hidden");
    renderTestimonials();
    updateStats();
  });

  renderTestimonials();
}

// 4. About Manager Implementation
async function setupAboutManager() {
  const form = document.getElementById("about-form");
  const info = await db.getAboutInfo();

  document.getElementById("about-name").value = info.name || "Emmanuel Ajibewe";
  document.getElementById("about-tagline").value = info.tagline || "Systems-led product engineer";
  document.getElementById("about-bio1").value = info.bio1 || "";
  document.getElementById("about-bio2").value = info.bio2 || "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById("about-name").value.trim(),
      tagline: document.getElementById("about-tagline").value.trim(),
      bio1: document.getElementById("about-bio1").value.trim(),
      bio2: document.getElementById("about-bio2").value.trim()
    };
    await db.saveAboutInfo(updated);
    alert("Profile specifications successfully updated!");
  });
}

// 5. Bugs / Changelog Manager Implementation
async function setupBugsManager() {
  const form = document.getElementById("bug-form");
  const body = document.getElementById("bugs-list-body");
  const addBtn = document.getElementById("add-bug-btn");
  const cancelBtn = document.getElementById("cancel-bug-btn");

  const renderBugs = async () => {
    const list = await db.getBugs();
    body.innerHTML = "";
    if (list.length === 0) {
      body.innerHTML = `<tr><td colspan="3" class="p-8 text-center text-muted-foreground">No bug/dev reports loaded.</td></tr>`;
      return;
    }
    list.forEach(b => {
      let statusClass = "bg-primary/10 text-primary";
      if (b.status === "Resolved") statusClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      if (b.status === "In Progress") statusClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";

      const tr = document.createElement("tr");
      tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
      tr.innerHTML = `
        <td class="p-4">
          <div class="font-bold text-base">${b.title}</div>
          <div class="text-xs text-muted-foreground mt-1 line-clamp-1">${b.description}</div>
        </td>
        <td class="p-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass}">${b.status}</span>
        </td>
        <td class="p-4">
          <div class="flex gap-2">
            <button class="edit-b-btn text-xs font-semibold hover:text-primary transition" data-id="${b.id}">Edit</button>
            <button class="delete-b-btn text-xs font-semibold text-destructive hover:opacity-85 transition" data-id="${b.id}">Delete</button>
          </div>
        </td>
      `;
      body.appendChild(tr);
    });

    document.querySelectorAll(".delete-b-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this log entry?")) {
          await db.deleteBug(btn.getAttribute("data-id"));
          renderBugs();
          updateStats();
        }
      });
    });

    document.querySelectorAll(".edit-b-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = list.find(b => b.id === id);
        if (item) {
          document.getElementById("bug-id").value = item.id;
          document.getElementById("bug-title").value = item.title;
          document.getElementById("bug-status").value = item.status || "Active";
          document.getElementById("bug-description").value = item.description;

          document.getElementById("bug-form-title").textContent = "Edit Log Entry";
          form.classList.remove("hidden");
        }
      });
    });
  };

  addBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("bug-id").value = "";
    document.getElementById("bug-form-title").textContent = "Log New Issue / Update";
    form.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    form.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bug = {
      id: document.getElementById("bug-id").value || undefined,
      title: document.getElementById("bug-title").value.trim(),
      status: document.getElementById("bug-status").value,
      description: document.getElementById("bug-description").value.trim()
    };
    await db.saveBug(bug);
    form.classList.add("hidden");
    renderBugs();
    updateStats();
  });

  renderBugs();
}

// 6. Data Import & Export operations
function setupBackupRestore() {
  const exportBtn = document.getElementById("export-data");
  const importBtn = document.getElementById("import-data-btn");
  const fileInput = document.getElementById("import-file-input");

  exportBtn.addEventListener("click", async () => {
    const backup = {
      projects: await db.getProjects(),
      testimonials: await db.getTestimonials(),
      about: await db.getAboutInfo(),
      bugs: await db.getBugs()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `nocode-savvy-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  });

  importBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (data.projects) {
          if (sbClient) {
            // Upsert array to Supabase
            for (let p of data.projects) await db.saveProject(p);
          } else {
            localStorage.setItem("db_projects", JSON.stringify(data.projects));
          }
        }
        if (data.testimonials) {
          if (sbClient) {
            for (let t of data.testimonials) await db.saveTestimonial(t);
          } else {
            localStorage.setItem("db_testimonials", JSON.stringify(data.testimonials));
          }
        }
        if (data.about) {
          await db.saveAboutInfo(data.about);
        }
        if (data.bugs) {
          if (sbClient) {
            for (let b of data.bugs) await db.saveBug(b);
          } else {
            localStorage.setItem("db_bugs", JSON.stringify(data.bugs));
          }
        }

        alert("Data successfully restored! Refreshing page...");
        location.reload();
      } catch (err) {
        alert("Failed to parse JSON backup file. Make sure file format is correct.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  });
}
