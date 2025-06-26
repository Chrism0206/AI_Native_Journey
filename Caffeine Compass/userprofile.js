import { coffeeDatabase } from './database.js';

// Profile state (simulate user data, use localStorage for persistence)
const defaultProfile = {
  name: 'Your Name',
  avatar: '',
  favoriteBean: 'Colombian Supremo',
  preferredRoast: 'Medium',
  flavorProfile: ['Nutty', 'Chocolate'],
  memberSince: '2024-01-01',
  beansExplored: 0
};

function getProfile() {
  return JSON.parse(localStorage.getItem('userProfile')) || defaultProfile;
}
function saveProfile(profile) {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}

let profile = getProfile();

// DOM Elements
const avatarImage = document.getElementById('avatarImage');
const editAvatarBtn = document.getElementById('editAvatarBtn');
const avatarUpload = document.getElementById('avatarUpload');
const profileName = document.getElementById('profileName');
const editName = document.getElementById('editName');
const profileBadge = document.getElementById('profileBadge');
const profileRole = document.getElementById('profileRole');
const favoriteBeanDisplay = document.getElementById('favoriteBeanDisplay');
const favoriteBeanEdit = document.getElementById('favoriteBeanEdit');
const preferredRoastDisplay = document.getElementById('preferredRoastDisplay');
const preferredRoastEdit = document.getElementById('preferredRoastEdit');
const flavorProfileDisplay = document.getElementById('flavorProfileDisplay');
const flavorProfileEdit = document.getElementById('flavorProfileEdit');
const memberSinceDisplay = document.getElementById('memberSinceDisplay');
const memberSinceEdit = document.getElementById('memberSinceEdit');
const beansExploredCount = document.getElementById('beansExploredCount');
const beansExploredBar = document.getElementById('beansExploredBar');
const editProfileBtn = document.getElementById('editProfileBtn');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const cancelProfileBtn = document.getElementById('cancelProfileBtn');

// --- UI Rendering ---
function renderProfile() {
  // Avatar
  if (profile.avatar) {
    avatarImage.style.backgroundImage = `url('${profile.avatar}')`;
  } else {
    avatarImage.style.backgroundImage = `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxnVSxfNlCxBxLQ3NYy-_3vnXRHZgqjwq0624tyAcqzCHxlUQQGlF_GazseABcsqyggSu9A9_KEfcSYaSKNwnEtIrsceTqsLwkR4-wF5F25nm8RiPz6W0hBh4Dn0B7NQh74cugFPEMuULr0E40wDg5TYh6WfVqgSO-A85ASe_csY2eIB3LTjzraCbBYh1HQeCC6V5O0bNnjQ2ytRrqrQOL63BXaNbFOax874oCIP4udyshJRRiRF63auQG62sqCq_ANb5hJHbDyKM')`;
  }
  profileName.textContent = profile.name;
  editName.value = profile.name;
  favoriteBeanDisplay.textContent = profile.favoriteBean;
  preferredRoastDisplay.textContent = profile.preferredRoast;
  flavorProfileDisplay.textContent = profile.flavorProfile.join(', ');
  memberSinceDisplay.textContent = profile.memberSince;
  beansExploredCount.textContent = profile.beansExplored;
  beansExploredBar.style.width = `${Math.min(100, profile.beansExplored * 10)}%`;
  renderBadge();
}

function renderBadge() {
  // Simple badge logic based on preferences
  let badge = '';
  if (profile.flavorProfile.includes('Citrus') || profile.flavorProfile.includes('Fruity')) {
    badge = 'The Citrus Seeker';
  } else if (profile.preferredRoast === 'Dark') {
    badge = 'Dark Roast Devotee';
  } else if (profile.flavorProfile.includes('Chocolate')) {
    badge = 'Chocophile';
  } else if (profile.flavorProfile.includes('Nutty')) {
    badge = 'Nutty Explorer';
  } else {
    badge = 'Coffee Enthusiast';
  }
  profileBadge.textContent = badge;
}

function setEditMode(editing) {
  // Name
  profileName.style.display = editing ? 'none' : '';
  editName.style.display = editing ? '' : 'none';
  // Favorite Bean
  favoriteBeanDisplay.style.display = editing ? 'none' : '';
  favoriteBeanEdit.style.display = editing ? '' : 'none';
  // Preferred Roast
  preferredRoastDisplay.style.display = editing ? 'none' : '';
  preferredRoastEdit.style.display = editing ? 'flex' : 'none';
  // Flavor Profile
  flavorProfileDisplay.style.display = editing ? 'none' : '';
  flavorProfileEdit.style.display = editing ? 'flex' : 'none';
  // Member Since
  memberSinceDisplay.style.display = editing ? 'none' : '';
  memberSinceEdit.style.display = editing ? '' : 'none';
  // Buttons
  editProfileBtn.style.display = editing ? 'none' : '';
  saveProfileBtn.style.display = editing ? '' : 'none';
  cancelProfileBtn.style.display = editing ? '' : 'none';
}

// --- Populate Beans Dropdown ---
function populateBeansDropdown() {
  favoriteBeanEdit.innerHTML = '';
  coffeeDatabase.forEach(bean => {
    const option = document.createElement('option');
    option.value = bean.name;
    option.textContent = bean.name;
    favoriteBeanEdit.appendChild(option);
  });
  favoriteBeanEdit.value = profile.favoriteBean;
}

// --- Populate Roast/Flavor Inputs ---
function setRoastInputs() {
  Array.from(preferredRoastEdit.querySelectorAll('input[type=radio]')).forEach(radio => {
    radio.checked = radio.value === profile.preferredRoast;
  });
}
function setFlavorInputs() {
  Array.from(flavorProfileEdit.querySelectorAll('input[type=checkbox]')).forEach(checkbox => {
    checkbox.checked = profile.flavorProfile.includes(checkbox.value);
  });
}

// --- Edit/Save/Cancel Logic ---
editProfileBtn.addEventListener('click', () => {
  setEditMode(true);
  populateBeansDropdown();
  setRoastInputs();
  setFlavorInputs();
  memberSinceEdit.value = profile.memberSince;
});

cancelProfileBtn.addEventListener('click', () => {
  setEditMode(false);
});

saveProfileBtn.addEventListener('click', () => {
  // Save all fields
  profile.name = editName.value.trim() || 'Your Name';
  profile.favoriteBean = favoriteBeanEdit.value;
  profile.preferredRoast = preferredRoastEdit.querySelector('input[type=radio]:checked')?.value || 'Medium';
  profile.flavorProfile = Array.from(flavorProfileEdit.querySelectorAll('input[type=checkbox]'))
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  profile.memberSince = memberSinceEdit.value || '2024-01-01';
  saveProfile(profile);
  setEditMode(false);
  renderProfile();
});

// --- Avatar Upload ---
editAvatarBtn.addEventListener('click', () => {
  avatarUpload.click();
});
avatarImage.addEventListener('click', () => {
  avatarUpload.click();
});
avatarUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt) {
    profile.avatar = evt.target.result;
    saveProfile(profile);
    renderProfile();
  };
  reader.readAsDataURL(file);
});

// --- Initial Render ---
setEditMode(false);
renderProfile(); 