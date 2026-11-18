/* AURA FINAL PROJECT: account simulation, profile, routine builder and public API */
document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);
  const showError = (id, message) => { const node = document.getElementById(id); if (node) node.textContent = message; };
  const emailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const passwordValid = (value) => value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);

  // Account tabs
  const signupTab = $("#signup-tab"), loginTab = $("#login-tab");
  function activateTab(which) {
    if (!signupTab || !loginTab) return;
    const isSignup = which === "signup";
    $("#signup-panel").hidden = !isSignup; $("#login-panel").hidden = isSignup;
    signupTab.classList.toggle("active", isSignup); loginTab.classList.toggle("active", !isSignup);
    signupTab.setAttribute("aria-selected", String(isSignup)); loginTab.setAttribute("aria-selected", String(!isSignup));
  }
  signupTab?.addEventListener("click", () => activateTab("signup"));
  loginTab?.addEventListener("click", () => activateTab("login"));

  // Academic front-end authentication demo. Never use real passwords here.
  $("#signup-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#signup-name").value.trim(), email = $("#signup-email").value.trim().toLowerCase(), password = $("#signup-password").value;
    showError("signup-name-error", name.length >= 2 ? "" : "Please enter your name (at least 2 characters).");
    showError("signup-email-error", emailValid(email) ? "" : "Please enter a valid email address.");
    showError("signup-password-error", passwordValid(password) ? "" : "Use at least 8 characters with letters and numbers.");
    if (name.length < 2 || !emailValid(email) || !passwordValid(password)) return;
    try {
      const existing = JSON.parse(localStorage.getItem("aura-user") || "null");
      if (existing && existing.email === email) { showError("signup-status", "An account with this email already exists. Please log in."); return; }
      localStorage.setItem("aura-user", JSON.stringify({name, email, password, createdAt:new Date().toLocaleDateString()}));
      showError("signup-status", "Account created! You can now log in.");
      $("#login-email").value = email; activateTab("login");
    } catch (error) { showError("signup-status", "Local storage is unavailable in this browser."); }
  });
  $("#login-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("#login-email").value.trim().toLowerCase(), password = $("#login-password").value;
    showError("login-email-error", emailValid(email) ? "" : "Please enter a valid email address.");
    showError("login-password-error", password ? "" : "Please enter your password.");
    if (!emailValid(email) || !password) return;
    try {
      const user = JSON.parse(localStorage.getItem("aura-user") || "null");
      if (!user || user.email !== email || user.password !== password) { showError("login-status", "Email or password is incorrect. Please try again."); return; }
      localStorage.setItem("aura-session", "active"); window.location.href = "profile.html";
    } catch (error) { showError("login-status", "Could not read account details. Please try again."); }
  });

  // Profile page
  if (location.pathname.endsWith("profile.html")) {
    let user = null; try { user = JSON.parse(localStorage.getItem("aura-user") || "null"); } catch (e) {}
    if (!user || localStorage.getItem("aura-session") !== "active") { window.location.replace("account.html"); return; }
    $("#profile-name").textContent = user.name; $("#profile-email").textContent = user.email;
    $("#profile-created").textContent = "AURA member since " + (user.createdAt || "today");
  }
  $("#logout-button")?.addEventListener("click", () => { localStorage.removeItem("aura-session"); window.location.href = "account.html"; });

  // Skin routine builder. These are general educational examples, not diagnosis.
  const plans = {
    dry: {morning:[["Gentle cleanser","Choose a non-stripping cleanser or rinse with lukewarm water."],["Hydrating serum","Look for glycerin or hyaluronic acid if tolerated."],["Moisturizer","Choose a cream that supports the skin barrier."],["Broad-spectrum SPF 30+","Apply sunscreen as the final morning step."]], evening:[["Gentle cleanser","Remove sunscreen, makeup and daily buildup."],["Hydrating serum","Optional; introduce one product at a time."],["Rich moisturizer","Seal in hydration and support comfort."]] },
    oily: {morning:[["Gentle gel cleanser","Avoid harsh scrubbing or over-cleansing."],["Lightweight moisturizer","Choose a light, non-comedogenic texture if suitable."],["Broad-spectrum SPF 30+","Use daily, even when it is cloudy."]], evening:[["Gentle cleanser","Cleanse without leaving the skin tight."],["Optional balancing serum","Introduce niacinamide slowly if tolerated."],["Light moisturizer","Oily skin still benefits from hydration."]] },
    combination:{morning:[["Gentle cleanser","Use a balanced, non-stripping cleanser."],["Light hydrating serum","Apply a thin layer to the face."],["Light moisturizer","Use more on dry areas if needed."],["Broad-spectrum SPF 30+","Finish with daily sun protection."]],evening:[["Gentle cleanser","Remove sunscreen and impurities."],["Optional targeted serum","Use only if needed and tolerated."],["Moisturizer","Adjust amount for different facial areas."]] },
    normal:{morning:[["Gentle cleanser","Keep cleansing simple."],["Hydrating serum","Optional step for extra hydration."],["Moisturizer","Choose a comfortable everyday formula."],["Broad-spectrum SPF 30+","Protect your skin every morning."]],evening:[["Gentle cleanser","Cleanse away the day."],["Optional serum","Choose one product for your main goal."],["Moisturizer","Finish with a comfortable moisturizer."]] },
    sensitive:{morning:[["Very gentle cleanser","Use fragrance-free options when possible."],["Simple moisturizer","Choose a short, gentle formula."],["Broad-spectrum SPF 30+","Choose a sunscreen your skin tolerates."]],evening:[["Gentle cleanser","Avoid hot water and friction."],["Barrier-supporting moisturizer","Keep the routine short and consistent."]] }
  };
  const goalNotes = {hydration:"Focus: hydration and skin-barrier comfort.",balance:"Focus: gentle cleansing and balanced hydration.",glow:"Focus: consistent basic care and sun protection.",simple:"Focus: a simple routine with only essential steps."};
  const routineForm = $("#routine-form");
  function renderSteps(target, steps, prefix) {
    const container = document.getElementById(target); container.innerHTML = "";
    steps.forEach((step,index) => {
      const id = prefix + "-" + index; const row = document.createElement("div"); row.className = "routine-step";
      const check = document.createElement("input"); check.type = "checkbox"; check.id = id; check.dataset.step = id;
      const label = document.createElement("label"); label.htmlFor = id; label.append(document.createTextNode(step[0]));
      const detail = document.createElement("small"); detail.textContent = step[1]; label.append(detail);
      row.append(check,label); container.append(row);
    });
  }
  function trackerKey(){ return "aura-routine-progress-" + new Date().toISOString().slice(0,10); }
  function updateTracker(){
    const checks = Array.from(document.querySelectorAll(".routine-step input")); if (!checks.length) return;
    const done = checks.filter(c=>c.checked).length, percent = Math.round(done/checks.length*100);
    $("#tracker-progress").textContent = percent + "% complete"; $("#tracker-fill").style.width = percent + "%";
    $("#tracker-message").textContent = done === checks.length ? "Wonderful! You completed today's routine ✨" : done + " of " + checks.length + " steps completed.";
    try { localStorage.setItem(trackerKey(), JSON.stringify(checks.filter(c=>c.checked).map(c=>c.dataset.step))); } catch(e) {}
  }
  routineForm?.addEventListener("submit", (event)=>{
    event.preventDefault(); const skin=$("#skin-type").value, goal=$("#skin-goal").value;
    showError("skin-type-error",skin?"":"Please choose your skin type."); showError("skin-goal-error",goal?"":"Please choose your goal."); if(!skin||!goal)return;
    renderSteps("morning-steps",plans[skin].morning,"am"); renderSteps("evening-steps",plans[skin].evening,"pm");
    $("#routine-title").textContent = skin.charAt(0).toUpperCase()+skin.slice(1)+" skin · "+goalNotes[goal];
    $("#routine-results").hidden=false;
    let saved=[]; try{saved=JSON.parse(localStorage.getItem(trackerKey())||"[]");}catch(e){}
    document.querySelectorAll(".routine-step input").forEach(c=>{c.checked=saved.includes(c.dataset.step);c.addEventListener("change",()=>{c.closest(".routine-step").classList.toggle("done",c.checked);updateTracker();});c.closest(".routine-step").classList.toggle("done",c.checked);});
    updateTracker(); $("#routine-results").scrollIntoView({behavior:"smooth",block:"start"});
  });
  $("#reset-routine")?.addEventListener("click",()=>{$("#routine-results").hidden=true;routineForm.reset();});
  $("#clear-tracker")?.addEventListener("click",()=>{document.querySelectorAll(".routine-step input").forEach(c=>{c.checked=false;c.closest(".routine-step").classList.remove("done");});try{localStorage.removeItem(trackerKey());}catch(e){}updateTracker();});

  // Open Beauty Facts: official community-maintained cosmetics database.
  $("#api-search-form")?.addEventListener("submit",async(event)=>{
    event.preventDefault(); const query=$("#api-query").value.trim(); const status=$("#api-status"), results=$("#api-results"), button=$("#api-search-button");
    showError("api-query-error",query.length>=2?"":"Enter at least 2 characters."); if(query.length<2)return;
    results.innerHTML=""; status.textContent="Searching the Open Beauty Facts database…"; button.disabled=true; button.innerHTML='<span class="mini-spinner"></span> Searching';
    try{
      const endpoint="https://world.openbeautyfacts.org/cgi/search.pl?search_terms="+encodeURIComponent(query)+"&search_simple=1&action=process&json=1&page_size=9&fields=code,product_name,brands,image_front_url,ingredients_text";
      const response=await fetch(endpoint,{headers:{Accept:"application/json"}}); if(!response.ok)throw new Error("The database returned an error.");
      const data=await response.json(); const products=(data.products||[]).filter(p=>p.product_name||p.brands);
      if(!products.length){status.textContent="No products found. Try another keyword.";return;}
      status.textContent="Found "+products.length+" product(s). Product details depend on community submissions.";
      products.forEach(product=>{
        const card=document.createElement("article");card.className="api-product";
        if(product.image_front_url){const img=document.createElement("img");img.src=product.image_front_url;img.alt=(product.product_name||"Cosmetic product")+" product image";img.loading="lazy";card.append(img);}
        const title=document.createElement("h3");title.textContent=product.product_name||"Unnamed product";card.append(title);
        const brand=document.createElement("p");brand.textContent="Brand: "+(product.brands||"Not listed");card.append(brand);
        const ingredients=document.createElement("p");ingredients.textContent="Ingredients: "+(product.ingredients_text?product.ingredients_text.slice(0,220)+(product.ingredients_text.length>220?"…":""):"Not provided");card.append(ingredients);
        if(product.code){const link=document.createElement("a");link.href="https://world.openbeautyfacts.org/product/"+encodeURIComponent(product.code);link.target="_blank";link.rel="noopener";link.textContent="View product details";card.append(link);}
        results.append(card);
      });
    }catch(error){status.textContent="Sorry, the product database is temporarily unavailable. Please try again later.";}
    finally{button.disabled=false;button.textContent="Search database";}
  });

  // Persistent theme setting also applies on pages added for the final project.
  if(localStorage.getItem("aura-theme")==="night") document.body.classList.add("night-theme");
});
