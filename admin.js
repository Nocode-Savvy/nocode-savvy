// Admin Dashboard controller logic for Nocode Savvy

let sbClient = null;

// Initialize Supabase Client if credentials exist
function initSupabase() {
  const url = localStorage.getItem("sb_url") || "https://iyhynpndndgxyioojdwp.supabase.co";
  const key = localStorage.getItem("sb_key") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aHlucG5kbmRneHlpb29qZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDg4MTksImV4cCI6MjA5NjUyNDgxOX0.QrDi0n3i-Et4EUabbPU6dtn9A-g35xDm3Ogv22jzXe4";
  const badge = document.getElementById("storage-status-badge");

  if (url && key && window.supabase) {
    try {
      sbClient = window.supabase.createClient(url, key);
      if (badge) {
        badge.textContent = "Supabase Connected";
        badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      }
      return true;
    } catch (e) {
      console.error("Supabase client init failed:", e);
    }
  }

  sbClient = null;
  if (badge) {
    badge.textContent = "LocalStorage Only";
    badge.className = "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20";
  }
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

  // Blogs Operations
  async getBlogs() {
    if (sbClient) {
      const { data, error } = await sbClient.from("blogs").select("*").order("created_at", { ascending: false });
      if (!error) return data;
      console.warn("Supabase load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_blogs");
    return local ? JSON.parse(local) : [];
  },
  async saveBlog(blog) {
    if (sbClient) {
      let result;
      if (blog.id) {
        result = await sbClient.from("blogs").update(blog).eq("id", blog.id);
      } else {
        delete blog.id;
        result = await sbClient.from("blogs").insert([blog]);
      }
      if (!result.error) return true;
      console.warn("Supabase save failed, falling back to LocalStorage:", result.error);
    }
    const blogs = await this.getBlogs();
    if (blog.id) {
      const idx = blogs.findIndex(b => b.id === blog.id);
      if (idx !== -1) blogs[idx] = blog;
    } else {
      blog.id = crypto.randomUUID();
      blog.created_at = new Date().toISOString();
      blogs.unshift(blog);
    }
    localStorage.setItem("db_blogs", JSON.stringify(blogs));
    return true;
  },
  async deleteBlog(id) {
    if (sbClient) {
      const { error } = await sbClient.from("blogs").delete().eq("id", id);
      if (!error) return true;
      console.warn("Supabase delete failed, falling back to LocalStorage:", error);
    }
    const blogs = await this.getBlogs();
    const updated = blogs.filter(b => b.id !== id);
    localStorage.setItem("db_blogs", JSON.stringify(updated));
    return true;
  },

  // Analytics Operations
  async getAnalytics() {
    if (sbClient) {
      const { data, error } = await sbClient.from("analytics").select("*").order("created_at", { ascending: false });
      if (!error) return data;
      console.warn("Supabase analytics load failed, falling back to LocalStorage:", error);
    }
    const local = localStorage.getItem("db_analytics");
    return local ? JSON.parse(local) : [];
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
  initTheme();
  initBackgroundCanvas();
  initSupabase();

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
  const themeToggles = document.querySelectorAll("#theme-toggle");
  const sunIcons = document.querySelectorAll("#theme-sun-icon");
  const moonIcons = document.querySelectorAll("#theme-moon-icon");

  let currentTheme = localStorage.getItem("ncs-theme") || 
                     (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(currentTheme);
  updateIcons(currentTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      document.documentElement.classList.add("theme-transitioning");
      
      const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(nextTheme);
      localStorage.setItem("ncs-theme", nextTheme);
      updateIcons(nextTheme);
      
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 600);
    });
  });

  function updateIcons(theme) {
    if (theme === "dark") {
      sunIcons.forEach(icon => icon.classList.remove("hidden"));
      moonIcons.forEach(icon => icon.classList.add("hidden"));
    } else {
      sunIcons.forEach(icon => icon.classList.add("hidden"));
      moonIcons.forEach(icon => icon.classList.remove("hidden"));
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
  // Set up forms & event listeners
  setupProjectsManager();
  setupTestimonialsManager();
  setupAboutManager();
  setupBlogsManager();
  setupAnalyticsManager();
  setupBackupRestore();

  // Load active count stats
  updateStats();
}

// Update Dashboard Statistics Card
async function updateStats() {
  const proj = await db.getProjects();
  const test = await db.getTestimonials();
  const blogs = await db.getBlogs();
  const views = await db.getAnalytics();

  document.getElementById("stat-projects").textContent = proj.length;
  document.getElementById("stat-testimonials").textContent = test.length;
  document.getElementById("stat-bugs").textContent = blogs.length;
  const statViews = document.getElementById("stat-views");
  if (statViews) statViews.textContent = views.length;
}

// 1. Database Configuration elements removed from layout. Fallback initialized directly.

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

// 5. Blogs Manager Implementation
async function setupBlogsManager() {
  const form = document.getElementById("blog-form");
  const body = document.getElementById("blogs-list-body");
  const addBtn = document.getElementById("add-blog-btn");
  const cancelBtn = document.getElementById("cancel-blog-btn");

  const renderBlogs = async () => {
    const list = await db.getBlogs();
    body.innerHTML = "";
    if (list.length === 0) {
      body.innerHTML = `<tr><td colspan="3" class="p-8 text-center text-muted-foreground">No articles or blog posts logged yet.</td></tr>`;
      return;
    }
    list.forEach(b => {
      let statusClass = "bg-primary/10 text-primary";
      if (b.status === "Published") statusClass = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      if (b.status === "Draft") statusClass = "bg-amber-500/10 text-amber-400 border border-amber-500/20";

      const tr = document.createElement("tr");
      tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
      tr.innerHTML = `
        <td class="p-4">
          <div class="font-bold text-base">${b.title}</div>
          <div class="text-xs text-muted-foreground mt-1 line-clamp-1">${b.excerpt || b.content}</div>
        </td>
        <td class="p-4">
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass}">${b.status}</span>
        </td>
        <td class="p-4">
          <div class="flex gap-2">
            <button class="edit-blog-btn text-xs font-semibold hover:text-primary transition" data-id="${b.id}">Edit</button>
            <button class="delete-blog-btn text-xs font-semibold text-destructive hover:opacity-85 transition" data-id="${b.id}">Delete</button>
          </div>
        </td>
      `;
      body.appendChild(tr);
    });

    document.querySelectorAll(".delete-blog-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this blog post?")) {
          await db.deleteBlog(btn.getAttribute("data-id"));
          renderBlogs();
          updateStats();
        }
      });
    });

    document.querySelectorAll(".edit-blog-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = list.find(b => b.id === id);
        if (item) {
          document.getElementById("blog-id").value = item.id;
          document.getElementById("blog-title").value = item.title;
          document.getElementById("blog-status").value = item.status || "Published";
          document.getElementById("blog-excerpt").value = item.excerpt || "";
          document.getElementById("blog-content").value = item.content;

          document.getElementById("blog-form-title").textContent = "Edit Blog Post";
          form.classList.remove("hidden");
        }
      });
    });
  };

  addBtn.addEventListener("click", () => {
    form.reset();
    document.getElementById("blog-id").value = "";
    document.getElementById("blog-form-title").textContent = "Create New Blog Post";
    form.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    form.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const blog = {
      id: document.getElementById("blog-id").value || undefined,
      title: document.getElementById("blog-title").value.trim(),
      status: document.getElementById("blog-status").value,
      excerpt: document.getElementById("blog-excerpt").value.trim(),
      content: document.getElementById("blog-content").value.trim()
    };
    await db.saveBlog(blog);
    form.classList.add("hidden");
    renderBlogs();
    updateStats();
  });

  renderBlogs();
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
      blogs: await db.getBlogs(),
      analytics: await db.getAnalytics()
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
        if (data.blogs) {
          if (sbClient) {
            for (let b of data.blogs) await db.saveBlog(b);
          } else {
            localStorage.setItem("db_blogs", JSON.stringify(data.blogs));
          }
        }
        if (data.analytics) {
          if (sbClient) {
            for (let a of data.analytics) {
              await sbClient.from("analytics").insert([a]);
            }
          } else {
            localStorage.setItem("db_analytics", JSON.stringify(data.analytics));
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

// 7. Analytics Dashboard Manager Implementation
async function setupAnalyticsManager() {
  const refreshBtn = document.getElementById("refresh-analytics-btn");
  if (!refreshBtn) return;

  const renderAnalytics = async () => {
    const data = await db.getAnalytics();

    // A. Stats Summary
    const totalViews = data.length;
    const uniqueSessionIds = new Set(data.map(item => item.session_id));
    const uniqueVisitors = uniqueSessionIds.size;
    const avgViews = uniqueVisitors > 0 ? (totalViews / uniqueVisitors).toFixed(1) : "0.0";

    const totalViewsEl = document.getElementById("analytics-total-views");
    const uniqueVisitorsEl = document.getElementById("analytics-unique-visitors");
    const avgViewsEl = document.getElementById("analytics-avg-views");

    if (totalViewsEl) {
      totalViewsEl.textContent = totalViews;
      totalViewsEl.classList.remove("animate-pulse");
    }
    if (uniqueVisitorsEl) {
      uniqueVisitorsEl.textContent = uniqueVisitors;
      uniqueVisitorsEl.classList.remove("animate-pulse");
    }
    if (avgViewsEl) {
      avgViewsEl.textContent = avgViews;
      avgViewsEl.classList.remove("animate-pulse");
    }

    // B. Daily Chart (Last 7 Days)
    const last7Days = [];
    const dailyCounts = [];
    const dailyLabels = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0,0,0,0);
      last7Days.push(d);

      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      dailyLabels.push(label);
      dailyCounts.push(0);
    }

    data.forEach(item => {
      if (item.created_at) {
        const itemDate = new Date(item.created_at);
        itemDate.setHours(0,0,0,0);
        const dayIdx = last7Days.findIndex(d => d.getTime() === itemDate.getTime());
        if (dayIdx !== -1) {
          dailyCounts[dayIdx]++;
        }
      }
    });

    const chartContainer = document.getElementById("analytics-chart-container");
    if (chartContainer) {
      chartContainer.innerHTML = "";
      const maxVal = Math.max(...dailyCounts, 1);

      dailyCounts.forEach((count, i) => {
        const dayLabel = dailyLabels[i];
        const pct = (count / maxVal) * 80; // Scale to 80% to fit tooltips

        const barWrapper = document.createElement("div");
        barWrapper.className = "flex-1 flex flex-col items-center group relative h-full justify-end pb-2";
        barWrapper.innerHTML = `
          <!-- Tooltip -->
          <div class="absolute -top-7 bg-primary text-primary-foreground text-[10px] font-mono px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-10 whitespace-nowrap">
            ${count} views
          </div>
          <!-- Bar -->
          <div class="w-6 md:w-10 rounded-t bg-primary/20 border-t border-x border-primary/40 group-hover:bg-primary/40 group-hover:border-primary transition-all duration-300" style="height: ${pct}%;"></div>
          <!-- Date Label -->
          <span class="text-[9px] text-muted-foreground font-mono mt-2">${dayLabel}</span>
        `;
        chartContainer.appendChild(barWrapper);
      });
    }

    // C. Top Pages Table
    const pageCounts = {};
    data.forEach(item => {
      if (item.page) {
        pageCounts[item.page] = (pageCounts[item.page] || 0) + 1;
      }
    });
    const sortedPages = Object.entries(pageCounts).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const pagesBody = document.getElementById("analytics-pages-body");
    if (pagesBody) {
      pagesBody.innerHTML = "";
      if (sortedPages.length === 0) {
        pagesBody.innerHTML = `<tr><td colspan="2" class="py-4 text-center text-muted-foreground">No traffic logs found.</td></tr>`;
      } else {
        sortedPages.forEach(([page, count]) => {
          const tr = document.createElement("tr");
          tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
          tr.innerHTML = `
            <td class="py-3 font-mono text-xs text-foreground/80">${page}</td>
            <td class="py-3 text-right font-semibold font-mono">${count}</td>
          `;
          pagesBody.appendChild(tr);
        });
      }
    }

    // D. Top Referrers Table
    const refCounts = {};
    data.forEach(item => {
      let ref = item.referrer || "Direct";
      if (ref.startsWith("http")) {
        try {
          ref = new URL(ref).hostname;
        } catch(e) {}
      }
      refCounts[ref] = (refCounts[ref] || 0) + 1;
    });
    const sortedRefs = Object.entries(refCounts).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const refsBody = document.getElementById("analytics-referrers-body");
    if (refsBody) {
      refsBody.innerHTML = "";
      if (sortedRefs.length === 0) {
        refsBody.innerHTML = `<tr><td colspan="2" class="py-4 text-center text-muted-foreground">No traffic logs found.</td></tr>`;
      } else {
        sortedRefs.forEach(([ref, count]) => {
          const tr = document.createElement("tr");
          tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
          tr.innerHTML = `
            <td class="py-3 text-foreground/80">${ref}</td>
            <td class="py-3 text-right font-semibold font-mono">${count}</td>
          `;
          refsBody.appendChild(tr);
        });
      }
    }

    // E. Live Traffic Stream Table (Last 15 Hits)
    const streamBody = document.getElementById("analytics-stream-body");
    if (streamBody) {
      streamBody.innerHTML = "";
      const recentHits = data.slice(0, 15);
      if (recentHits.length === 0) {
        streamBody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-muted-foreground">No page views recorded yet.</td></tr>`;
      } else {
        recentHits.forEach(hit => {
          const timeStr = hit.created_at ? new Date(hit.created_at).toLocaleString() : '';

          const ua = hit.user_agent || "";
          let device = "Desktop";
          if (/mobile/i.test(ua)) device = "Mobile";
          else if (/tablet/i.test(ua)) device = "Tablet";

          let os = "Unknown OS";
          if (/windows/i.test(ua)) os = "Windows";
          else if (/macintosh|mac os x/i.test(ua)) os = "macOS";
          else if (/iphone|ipad/i.test(ua)) os = "iOS";
          else if (/android/i.test(ua)) os = "Android";
          else if (/linux/i.test(ua)) os = "Linux";

          const tr = document.createElement("tr");
          tr.className = "border-b border-foreground/5 hover:bg-foreground/[0.01]";
          tr.innerHTML = `
            <td class="p-4 font-mono text-xs text-muted-foreground">${timeStr}</td>
            <td class="p-4 font-mono text-xs font-semibold">${hit.page}</td>
            <td class="p-4 text-xs text-muted-foreground max-w-[200px] truncate" title="${hit.referrer}">${hit.referrer}</td>
            <td class="p-4 text-xs text-muted-foreground">${device} (${os})</td>
          `;
          streamBody.appendChild(tr);
        });
      }
    }
  };

  refreshBtn.addEventListener("click", renderAnalytics);
  renderAnalytics();
}
