(function () {
  'use strict';

  if (window.__agriDroneChatbotInitialized) return;
  window.__agriDroneChatbotInitialized = true;

  var STORAGE_KEY = 'agridrone_chat_history';
  var MAX_MESSAGE_LENGTH = 500;
  var MAX_HISTORY = 40;
  var lastIntent = '';
  var lastResponseIndex = {};
  var welcomeText = "Hello! I'm the AgriDroneSpray Assistant.\n\nI can help you understand our drone spraying services, farm registration, subscriptions, partnerships, safety and precision agriculture.\n\nHow can I help?";

  var responses = {
    greeting: [
      "Hello! I’m the AgriDroneSpray Assistant. I can help with precision spraying, farm registration, subscriptions, partnerships and safe drone operations. What would you like to explore?",
      "Welcome to AgriDroneSpray. Ask me about our services, how a spray booking works, compliance, subscriptions or becoming a partner.",
      "Hi there. I’m here to make AgriDroneSpray’s precision farming services easier to understand. How can I help with your farm or partnership plans?"
    ],
    about: [
      "AgriDroneSpray is a technology-enabled precision agriculture platform connecting farmers, FPOs and Custom Hiring Centres with certified drone pilots for fast, safe and efficient crop spraying across India.",
      "We make modern aerial spraying more accessible without requiring farmers to own a drone. Our network combines certified pilots, compliant equipment, digital records and practical field support.",
      "AgriDroneSpray brings precision drone operations to Indian farms, with a focus on efficient coverage, worker safety, operational traceability and dependable service delivery."
    ],
    services: [
      "AgriDroneSpray provides precision pesticide spraying, liquid fertilizer spraying, field mapping, variable-rate spraying, digital spray reports and season-long service plans. We also support operator training and licensing.",
      "Our core services cover pesticide and liquid fertilizer application. For data-led farming, we offer field mapping and variable-rate spraying, followed by digital records of the operation.",
      "You can book a drone for crop spraying, request field mapping, explore variable-rate application, or discuss a subscription for an FPO or larger farm. Certified pilots and the operational paperwork are part of the service."
    ],
    pesticide: [
      "Precision pesticide spraying gives more even coverage across the field while reducing worker exposure and the time needed for manual application. Input selection and rates should always follow the product label and qualified agricultural guidance.",
      "Our certified pilots can apply farmer- or agronomist-approved crop protection inputs with an NPNT-compliant drone, documented flight operations and a digital spray report after the job.",
      "Drone pesticide spraying is useful when a field needs timely, consistent coverage. AgriDroneSpray handles the drone operation and records; chemical choice and application rates remain guided by the product label and qualified advisers."
    ],
    fertilizer: [
      "Liquid fertilizer spraying provides uniform coverage at the crop stage you specify, helping reduce overuse and runoff. The appropriate product and rate must come from its label and qualified agricultural guidance.",
      "AgriDroneSpray supports liquid fertilizer application with certified pilots, precise aerial coverage and digital operational records. We do not prescribe fertilizer products or dosages through this assistant.",
      "A drone can cover liquid fertilizer efficiently across areas that are difficult or slow to treat manually. The service team applies the approved input and provides a record of the operation."
    ],
    mapping: [
      "Field mapping uses crop imagery such as NDVI or multispectral data to identify stressed zones and support a more targeted spray prescription. Pricing is assessed from the field size and requirements.",
      "Our mapping service helps turn field observations into usable operational information. It can highlight variation across a field before a prescription or variable-rate operation is planned.",
      "For farms that need more than uniform coverage, mapping can show where crop conditions differ. AgriDroneSpray can then discuss a field-specific prescription and variable-rate approach."
    ],
    variable: [
      "Variable-rate spraying adjusts application across the field using prescription data, applying more where it is needed and less where it is not. It is best discussed alongside field mapping and crop requirements.",
      "With a field prescription, variable-rate operations can target different zones instead of treating every part identically. The final setup depends on the map, crop and approved input.",
      "Variable-rate spraying is a data-led service for reducing unnecessary application. AgriDroneSpray can assess your field and explain whether mapping and zonal application are suitable."
    ],
    process: [
      "The process has four steps: register your farm with its location, size and crop; receive a scheduled slot and pilot assignment; have the NPNT-compliant drone spray the field; then receive a digital report with the flight log, chemical batch and coverage record.",
      "Start with the farm registration form, which takes under two minutes. The team confirms your requirements, assigns a certified pilot, completes the operation safely, and shares the spray documentation afterward.",
      "From registration to report, AgriDroneSpray coordinates the booking, pilot, compliant flight and records. This gives you a clear trail from the planned job through to field coverage."
    ],
    registration: [
      "To register a farm, use the ‘Register Your Farm’ form on the website and share your location, farm size and crop. The team can then review the request and call to confirm the service and timing.",
      "Farm registration is the starting point for a spray booking. Submit your location, acreage and crop through the website form; a team member will follow up before assigning a suitable pilot and slot.",
      "You can begin in under two minutes from the Register Your Farm button. Include accurate field details so AgriDroneSpray can assess the request and arrange the right operation."
    ],
    booking: [
      "For a booking, register the farm through the website with your location, field size and crop. AgriDroneSpray will confirm requirements, schedule a slot and allocate a certified pilot. This assistant cannot see live slots.",
      "A spray booking starts with farm registration. After the request is reviewed, the team confirms timing and operational details before the drone arrives at the field.",
      "Use the farm registration pathway for a new spray request. The team will call to confirm the field and scheduling details rather than relying on an unverified chatbot estimate."
    ],
    subscriptions: [
      "Subscription plans are designed for FPOs and larger landholders that need scheduled spraying, priority bookings and farm management support across a season. Plan details and pricing are tailored to requirements.",
      "A season-long subscription can help coordinate repeat operations across a sowing calendar, with priority scheduling and ongoing service support. Contact the AgriDroneSpray team for the current plan options.",
      "Subscriptions are useful when spraying is a recurring operational need rather than a single booking. AgriDroneSpray can discuss coverage, timing and support for your farm group or larger holding."
    ],
    pricing: [
      "Exact pricing depends on the service, field size, location and operating requirements. I do not want to invent a quote, so please register your farm or contact the team for current pricing.",
      "The website uses requirement-based pricing: routine spraying is assessed by the job, while mapping, variable-rate work, subscriptions and training are quoted according to scope. The team can confirm the exact amount.",
      "I can explain the services, but I cannot provide a verified live quote or guarantee a per-acre price. Use the farm registration form or contact globalexpressgroup@gmail.com for an accurate estimate."
    ],
    pilots: [
      "AgriDroneSpray works with certified and insured drone pilots. Operators use compliant equipment, maintain flight logs and follow safety procedures for each operation.",
      "The operator network is built around trained pilots and documented operations. AgriDroneSpray also offers pilot training and licensing for partners interested in running their own local hub.",
      "Every assigned operator is expected to hold the relevant Remote Pilot Certificate and work within the operational framework, including flight authorization, records and insurance."
    ],
    partnerships: [
      "AgriDroneSpray can work with FPOs, Custom Hiring Centres, agri-input companies, drone manufacturers, equipment suppliers and government agricultural initiatives. Use the Partner With Us page to choose the relevant pathway.",
      "Partnership opportunities include service networks, hardware supply, local operator hubs and coordinated work with FPOs or CHCs. The team can explain the route that best fits your organisation.",
      "For women drone pilots, the website includes a Namo Drone Didi registration pathway. Drone manufacturers can also register as hardware suppliers through the Partner With Us menu."
    ],
    compliance: [
      "Operations are designed around DGCA compliance, certified Remote Pilot Certificates, NPNT-enabled drones, Digital Sky registration and Unique Identification Numbers. Flights are supported by authorization and operational records.",
      "The operational framework includes certified pilots, NPNT, Digital Sky registration, insurance, safety procedures, digital flight logs and traceability records.",
      "Compliance is part of the service workflow: qualified pilots, registered equipment, digital authorization, documented conditions and post-operation records help keep each flight accountable."
    ],
    npnt: [
      "NPNT means ‘No Permission, No Takeoff’. It is a digital authorization framework that helps ensure a drone receives the required flight permission before takeoff.",
      "NPNT is important because it links the flight to the required digital authorization. AgriDroneSpray’s operating framework includes NPNT-enabled operations rather than unverified takeoffs.",
      "In simple terms, NPNT helps make sure a compliant flight is authorized before the drone leaves the ground. It works alongside Digital Sky registration and the drone’s identification details."
    ],
    safety: [
      "Safety includes certified pilots, compliant equipment, digital flight authorization, operational insurance, weather and consent records, chemical batch records and traceable flight logs.",
      "AgriDroneSpray’s safety approach combines trained operators, NPNT-enabled equipment, documented field conditions and insurance. The pilot also follows the product label and applicable operating requirements.",
      "The service is designed to reduce worker exposure during spraying while keeping the operation documented. Chemical selection, dosage and mixing must follow the product label and qualified agricultural guidance."
    ],
    reports: [
      "After an operation, the digital spray report can include the flight log, chemical batch and coverage record. This gives farmers and organisations a useful record for their own operations.",
      "Digital reports support traceability by documenting what was flown and applied during the service. AgriDroneSpray can also maintain operational and customer records for coordinated programs.",
      "A spray report is the post-operation record of coverage and inputs. It helps you review the job and retain evidence of the field operation."
    ],
    contact: [
      "You can reach AgriDroneSpray at globalexpressgroup@gmail.com or +91 96505 60277 / +91 99101 96123. For a spray request, the Register Your Farm form is the best starting point.",
      "For questions or a verified quote, visit the Contact page or email globalexpressgroup@gmail.com. The listed phone numbers are +91 96505 60277 and +91 99101 96123.",
      "The team can help with registration, scheduling and partnership enquiries. Contact globalexpressgroup@gmail.com or call +91 96505 60277 or +91 99101 96123."
    ],
    availability: [
      "I do not have live scheduling or location availability, so I cannot confirm whether a pilot can spray a particular village or date. Please register the farm or contact the team for a current assessment.",
      "Service coverage and tomorrow’s slots are confirmed by the AgriDroneSpray team, not by this browser-only assistant. Share your location and field details through the registration form for a real availability check.",
      "I cannot see real-time pilot locations, open slots or weather conditions. The Contact page or farm registration form will route your request to the team for confirmation."
    ],
    safetyBoundary: [
      "I can explain AgriDroneSpray’s spraying process, but I cannot recommend pesticide or fertilizer products, dosages or mixing instructions. Follow the product label, applicable requirements and qualified agricultural guidance.",
      "Chemical rates depend on the crop, product label, local requirements and field conditions. Please use a qualified agronomist or the product manufacturer for that advice; AgriDroneSpray handles the approved application operation.",
      "For safety, do not use this assistant for chemical prescriptions. The right input and rate must be confirmed from the label and a qualified agricultural adviser before spraying."
    ],
    fallback: [
      "I’m not able to find a verified answer to that within my AgriDroneSpray information. I can help with services, farm registration, subscriptions, partnerships, compliance or drone operations.",
      "I’m focused on AgriDroneSpray-related information. Try asking about drone spraying, field mapping, registration, subscriptions, safety or NPNT.",
      "I don’t have enough verified AgriDroneSpray information to answer that accurately. I can explain our available services and how the platform works."
    ]
  };

  var keywordGroups = {
    greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste'],
    about: ['who are you', 'about agri', 'what is agri', 'tell me about', 'company', 'platform'],
    pesticide: ['pesticide', 'crop protection', 'insecticide', 'herbicide', 'fungicide'],
    fertilizer: ['fertilizer', 'fertiliser', 'nutrient spray', 'liquid feed'],
    mapping: ['field mapping', 'map my field', 'ndvi', 'multispectral', 'crop map', 'imagery'],
    variable: ['variable rate', 'variable-rate', 'prescription spraying', 'zonal spraying'],
    services: ['service', 'services', 'what do you offer', 'what services', 'offerings', 'what can you do', 'drone service'],
    process: ['how does drone spraying work', 'how it works', 'process', 'steps', 'how do you spray', 'how does it work'],
    registration: ['register', 'registration', 'sign up', 'farm signup', 'join', 'enrol', 'enroll'],
    booking: ['book', 'booking', 'schedule', 'spray my farm', 'request a spray'],
    subscriptions: ['subscription', 'subscriptions', 'plan', 'plans', 'membership', 'season-long'],
    pricing: ['price', 'pricing', 'cost', 'how much', 'per acre', 'quote', 'rate'],
    pilots: ['pilot', 'pilots', 'operator', 'training', 'license', 'licensing', 'certified'],
    partnerships: ['partner', 'partnership', 'fpo', 'custom hiring', 'chc', 'manufacturer', 'supplier', 'namo drone didi'],
    compliance: ['dgca', 'compliance', 'legal', 'regulation', 'digital sky', 'unique identification', 'uin'],
    npnt: ['npnt', 'no permission no takeoff', 'no permission, no takeoff'],
    safety: ['safety', 'safe', 'insurance', 'insured', 'worker exposure'],
    reports: ['report', 'reports', 'flight log', 'coverage record', 'traceability', 'records'],
    contact: ['contact', 'email', 'phone', 'call', 'reach you'],
    availability: ['available', 'availability', 'in delhi', 'in my village', 'tomorrow', 'operate in', 'location'],
    safetyBoundary: ['dosage', 'dose', 'mixing', 'mix chemicals', 'chemical recommendation', 'recommend pesticide', 'recommend fertilizer', 'application rate']
  };

  function normalize(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ');
  }

  function includesAny(text, words) {
    return words.some(function (word) { return text.indexOf(word) !== -1; });
  }

  function detectIntent(rawText) {
    var text = normalize(rawText);
    if (!text) return 'fallback';
    if (includesAny(text, keywordGroups.safetyBoundary)) return 'safetyBoundary';
    if (includesAny(text, keywordGroups.npnt)) return 'npnt';
    if (includesAny(text, keywordGroups.availability) && !includesAny(text, ['what is availability'])) return 'availability';
    if (includesAny(text, keywordGroups.pricing)) return 'pricing';
    var priority = ['greeting', 'about', 'pesticide', 'fertilizer', 'mapping', 'variable', 'process', 'registration', 'booking', 'subscriptions', 'pilots', 'partnerships', 'compliance', 'safety', 'reports', 'contact', 'services'];
    for (var i = 0; i < priority.length; i += 1) {
      if (includesAny(text, keywordGroups[priority[i]])) return priority[i];
    }
    if (includesAny(text, ['tell me more', 'more detail', 'more about', 'what about that', 'why is it important', 'why important', 'explain that'])) return lastIntent || 'fallback';
    return 'fallback';
  }

  function chooseResponse(intent) {
    var choices = responses[intent] || responses.fallback;
    var previous = lastResponseIndex[intent];
    var index = Math.floor(Math.random() * choices.length);
    if (choices.length > 1 && index === previous) index = (index + 1) % choices.length;
    lastResponseIndex[intent] = index;
    lastIntent = intent;
    return choices[index];
  }

  var style = document.createElement('style');
  style.textContent = '\
    .ads-chat-launcher{position:fixed;right:24px;bottom:24px;z-index:1000;display:flex;align-items:center;gap:10px;padding:13px 17px;border:1px solid rgba(255,255,255,.22);border-radius:15px;background:#204c3f;color:#fff;font:700 14px/1.2 Inter,sans-serif;box-shadow:0 16px 34px rgba(17,39,31,.26);cursor:pointer;transition:transform .2s ease,background .2s ease,box-shadow .2s ease}.ads-chat-launcher:hover{background:#183d34;transform:translateY(-2px);box-shadow:0 20px 38px rgba(17,39,31,.3)}.ads-chat-launcher:active{transform:scale(.98)}.ads-chat-launcher svg{width:22px;height:22px;flex:none}.ads-chat-window{position:fixed;right:24px;bottom:86px;z-index:1001;width:min(410px,calc(100vw - 32px));height:min(640px,calc(100vh - 110px));display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(24,61,52,.16);border-radius:20px;background:#f7f5f0;color:#1a2f27;box-shadow:0 28px 70px rgba(17,39,31,.3);opacity:0;transform:translateY(14px) scale(.98);pointer-events:none;transition:opacity .2s ease,transform .2s ease}.ads-chat-window.is-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}.ads-chat-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 18px 16px;background:#204c3f;color:#fff}.ads-chat-title{display:flex;align-items:center;gap:10px;font:700 16px/1.25 Space\ Grotesk,sans-serif;letter-spacing:-.02em}.ads-chat-title small{display:block;margin-top:3px;color:#dfece1;font:500 11px/1.3 Inter,sans-serif;letter-spacing:0}.ads-chat-status{width:9px;height:9px;border-radius:50%;background:#9bd477;box-shadow:0 0 0 4px rgba(155,212,119,.15)}.ads-chat-actions{display:flex;gap:5px}.ads-chat-icon{border:0;border-radius:8px;padding:7px;background:transparent;color:#fff;font:600 11px Inter,sans-serif;cursor:pointer}.ads-chat-icon:hover,.ads-chat-icon:focus-visible{background:rgba(255,255,255,.13);outline:0}.ads-chat-icon.close{font-size:20px;line-height:1;padding:4px 7px}.ads-chat-messages{flex:1;overflow-y:auto;padding:18px 14px 12px;background:linear-gradient(180deg,#f7f5f0 0%,#edf4ee 100%)}.ads-chat-message{display:flex;margin:0 0 12px;animation:adsChatIn .2s ease both}.ads-chat-message.user{justify-content:flex-end}.ads-chat-bubble{max-width:84%;padding:11px 13px;border-radius:15px 15px 15px 4px;background:#fff;color:#1a2f27;font:500 13px/1.55 Inter,sans-serif;white-space:pre-line;box-shadow:0 5px 16px rgba(24,61,52,.07)}.ads-chat-message.user .ads-chat-bubble{border-radius:15px 15px 4px 15px;background:#295d4e;color:#fff;box-shadow:none}.ads-chat-typing .ads-chat-bubble{display:flex;gap:4px;align-items:center;padding:14px 15px}.ads-chat-typing i{width:5px;height:5px;border-radius:50%;background:#4f8d64;animation:adsDot 1s infinite ease-in-out}.ads-chat-typing i:nth-child(2){animation-delay:.15s}.ads-chat-typing i:nth-child(3){animation-delay:.3s}.ads-chat-suggestions{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 11px;background:#edf4ee}.ads-chat-suggestion{border:1px solid rgba(41,93,78,.22);border-radius:999px;padding:7px 10px;background:#fff;color:#295d4e;font:600 11px Inter,sans-serif;cursor:pointer}.ads-chat-suggestion:hover,.ads-chat-suggestion:focus-visible{border-color:#bd5a38;color:#9d4a2d;outline:0}.ads-chat-form{display:flex;align-items:flex-end;gap:8px;padding:11px;border-top:1px solid rgba(24,61,52,.12);background:#fff}.ads-chat-input{min-width:0;flex:1;max-height:100px;resize:none;border:1px solid rgba(24,61,52,.2);border-radius:11px;padding:10px 11px;background:#f7f5f0;color:#1a2f27;font:500 13px/1.4 Inter,sans-serif;outline:0}.ads-chat-input:focus{border-color:#4f8d64;box-shadow:0 0 0 3px rgba(79,141,100,.14)}.ads-chat-send{border:0;border-radius:10px;padding:10px 13px;background:#bd5a38;color:#fff;font:700 12px Inter,sans-serif;cursor:pointer}.ads-chat-send:disabled{cursor:not-allowed;opacity:.42}.ads-chat-send:not(:disabled):hover{background:#9d4a2d}.ads-chat-launcher:focus-visible,.ads-chat-send:focus-visible{outline:3px solid rgba(189,90,56,.4);outline-offset:2px}@keyframes adsChatIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@keyframes adsDot{0%,80%,100%{opacity:.3;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@media (max-width:600px){.ads-chat-launcher{right:16px;bottom:16px;padding:13px;border-radius:50%}.ads-chat-launcher span{display:none}.ads-chat-window{right:12px;bottom:76px;width:calc(100vw - 24px);height:min(680px,calc(100vh - 90px));border-radius:17px}.ads-chat-bubble{max-width:89%}}@media (prefers-reduced-motion:reduce){.ads-chat-launcher,.ads-chat-window,.ads-chat-message{transition:none;animation:none}.ads-chat-typing i{animation:none;opacity:.7}}';
  document.head.appendChild(style);

  var launcher = document.createElement('button');
  launcher.className = 'ads-chat-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open AgriDroneSpray Assistant');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 8.5h14M7 8.5l1.5-3h7L17 8.5M8 12v5m8-5v5M4 17h16M12 8.5V20"/><path d="M3 12h3m12 0h3M6 8.5l-2-2m14 2 2-2"/></svg><span>Ask AgriDroneSpray</span>';

  var windowEl = document.createElement('section');
  windowEl.className = 'ads-chat-window';
  windowEl.setAttribute('aria-label', 'AgriDroneSpray Assistant chat');
  windowEl.setAttribute('aria-hidden', 'true');
  windowEl.innerHTML = '<header class="ads-chat-header"><div class="ads-chat-title"><span class="ads-chat-status" aria-hidden="true"></span><div>AgriDroneSpray Assistant<small>Precision farming support</small></div></div><div class="ads-chat-actions"><button class="ads-chat-icon clear" type="button" aria-label="Clear chat">Clear</button><button class="ads-chat-icon close" type="button" aria-label="Close chat">&times;</button></div></header><div class="ads-chat-messages" role="log" aria-live="polite" aria-label="Conversation"></div><div class="ads-chat-suggestions" aria-label="Suggested questions"><button class="ads-chat-suggestion" type="button">How does drone spraying work?</button><button class="ads-chat-suggestion" type="button">What services do you offer?</button><button class="ads-chat-suggestion" type="button">How can I register my farm?</button><button class="ads-chat-suggestion" type="button">Do you offer subscriptions?</button><button class="ads-chat-suggestion" type="button">How can I partner with you?</button><button class="ads-chat-suggestion" type="button">What is NPNT?</button></div><form class="ads-chat-form"><textarea class="ads-chat-input" rows="1" maxlength="500" placeholder="Ask something..." aria-label="Ask AgriDroneSpray a question"></textarea><button class="ads-chat-send" type="submit" disabled>Send</button></form>';
  document.body.appendChild(launcher);
  document.body.appendChild(windowEl);

  var messagesEl = windowEl.querySelector('.ads-chat-messages');
  var inputEl = windowEl.querySelector('.ads-chat-input');
  var sendEl = windowEl.querySelector('.ads-chat-send');
  var formEl = windowEl.querySelector('.ads-chat-form');
  var typing = false;

  function saveHistory(history) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY))); } catch (error) { /* Storage can be unavailable in private browsing. */ }
  }

  function loadHistory() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(saved) ? saved.filter(function (item) { return item && (item.role === 'user' || item.role === 'assistant') && typeof item.text === 'string'; }).slice(-MAX_HISTORY) : [];
    } catch (error) { return []; }
  }

  var history = loadHistory();

  function addMessage(role, text, persist) {
    var message = document.createElement('div');
    message.className = 'ads-chat-message ' + role;
    var bubble = document.createElement('div');
    bubble.className = 'ads-chat-bubble';
    bubble.textContent = text;
    message.appendChild(bubble);
    messagesEl.appendChild(message);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    if (persist !== false) {
      history.push({ role: role, text: text });
      saveHistory(history);
    }
  }

  function showWelcome() {
    messagesEl.innerHTML = '';
    if (!history.length) {
      addMessage('assistant', welcomeText);
    } else {
      history.forEach(function (item) { addMessage(item.role, item.text, false); });
      var last = history.filter(function (item) { return item.role === 'user'; }).pop();
      if (last) lastIntent = detectIntent(last.text);
    }
  }

  function showTyping() {
    var typingEl = document.createElement('div');
    typingEl.className = 'ads-chat-message ads-chat-typing';
    typingEl.setAttribute('aria-label', 'Assistant is typing');
    typingEl.innerHTML = '<div class="ads-chat-bubble"><i></i><i></i><i></i></div>';
    messagesEl.appendChild(typingEl);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typingEl;
  }

  function setOpen(open) {
    windowEl.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    windowEl.setAttribute('aria-hidden', String(!open));
    if (open) {
      inputEl.focus();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    } else {
      launcher.focus();
    }
  }

  function sendMessage(value) {
    var text = value.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text || typing) return;
    addMessage('user', text);
    inputEl.value = '';
    sendEl.disabled = true;
    var typingEl = showTyping();
    typing = true;
    var delay = 700 + Math.floor(Math.random() * 701);
    window.setTimeout(function () {
      if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
      addMessage('assistant', chooseResponse(detectIntent(text)));
      typing = false;
      sendEl.disabled = true;
      inputEl.focus();
    }, delay);
  }

  launcher.addEventListener('click', function () { setOpen(!windowEl.classList.contains('is-open')); });
  windowEl.querySelector('.close').addEventListener('click', function () { setOpen(false); });
  windowEl.querySelector('.clear').addEventListener('click', function () {
    history = [];
    lastIntent = '';
    lastResponseIndex = {};
    saveHistory(history);
    showWelcome();
    inputEl.focus();
  });
  formEl.addEventListener('submit', function (event) { event.preventDefault(); sendMessage(inputEl.value); });
  inputEl.addEventListener('input', function () {
    sendEl.disabled = !inputEl.value.trim() || typing;
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
  });
  inputEl.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(inputEl.value);
    }
  });
  windowEl.querySelectorAll('.ads-chat-suggestion').forEach(function (button) {
    button.addEventListener('click', function () { sendMessage(button.textContent); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && windowEl.classList.contains('is-open')) setOpen(false);
  });

  showWelcome();
}());
