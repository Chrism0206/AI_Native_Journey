# Caffeine Compass ☕

An AI-powered coffee bean recommender that helps you discover your perfect coffee based on flavor preferences and roast level. Built with modern web technologies and a beautiful, responsive design.

## 📖 About This Project

Caffeine Compass is an intelligent coffee recommendation system that combines the art of coffee appreciation with modern AI algorithms. Born from a passion for helping coffee enthusiasts discover their perfect brew, this project transforms complex coffee characteristics into personalized recommendations through an intuitive, interactive experience.

**Key Highlights:**
- **AI-Powered Matching**: Sophisticated algorithm that analyzes multiple preference dimensions
- **Comprehensive Database**: Curated collection of premium coffee beans from around the world
- **Interactive Experience**: Multi-step "Build Your Brew" flow for engaging user interaction
- **Modern Architecture**: Built with vanilla JavaScript and modern web standards
- **Responsive Design**: Beautiful, accessible interface that works on all devices

## 🧠 How It Works

### Core AI-Generated Logic

The recommendation engine uses a sophisticated scoring algorithm that analyzes multiple dimensions of coffee preferences:

#### 1. **Preference Analysis System**
```javascript
// Multi-dimensional scoring algorithm
- Roast Level Compatibility (30 points)
- Flavor Profile Matching (20 points per match)
- Acidity Level Alignment (25 points)
- Body Preference Matching (20 points)
- Origin Preference Bonus (15 points)
- Base Quality Rating (2x multiplier)
```

#### 2. **Intelligent Matching Algorithm**
The system employs a weighted scoring approach where:
- **Exact matches** receive full points
- **Compatible matches** receive partial points (e.g., Medium-Dark works with Dark)
- **Flavor combinations** are analyzed for synergistic effects
- **Origin preferences** provide regional bonuses
- **Quality ratings** ensure recommendations meet high standards

#### 3. **Dynamic Recommendation Engine**
- **Real-time Processing**: Analyzes preferences instantly without external API calls
- **Contextual Scoring**: Considers how different attributes interact
- **Personalization**: Adapts recommendations based on user interaction patterns
- **Fallback Logic**: Ensures recommendations even with minimal preference data

#### 4. **Data Structure Architecture**
The system uses a **list of dictionaries** approach for optimal performance:
```javascript
coffeeDatabase = [
  {
    name: "Ethiopian Yirgacheffe",
    roast: "Light",
    flavors: ["Fruity", "Floral", "Citrus"],
    acidity: "High",
    body: "Medium",
    origin: "Ethiopia",
    rating: 4.8,
    description: "Bright, floral, citrus notes..."
  }
  // ... more coffee entries
]
```

#### 5. **User Experience Flow**
1. **Preference Collection**: Interactive 3-step "Build Your Brew" process
2. **Data Processing**: Real-time preference analysis and scoring
3. **Recommendation Generation**: Top matches with detailed explanations
4. **Result Presentation**: Beautiful, informative display with ratings and descriptions

## 🚀 How to Run It

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required
- No internet connection needed (fully self-contained)

### Quick Start
1. **Download/Clone** the repository to your local machine
2. **Navigate** to the `Caffeine Compass` folder
3. **Open** `index.html` in your web browser
4. **Start exploring** coffee recommendations immediately!

### Alternative Launch Methods

#### Method 1: Direct File Opening
```bash
# Simply double-click index.html or drag it into your browser
```

#### Method 2: Local Server (Recommended for Development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000` in your browser.

#### Method 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### File Structure
```
Caffeine Compass/
├── index.html              # Main application entry point
├── build-your-brew.html    # Interactive preference builder
├── recommendations.html    # Results display page
├── details.html           # Detailed coffee information
├── favorites.html         # User favorites management
├── userprofile.html       # User profile and preferences
├── styles.css             # Custom CSS styling
├── script.js              # Main application logic
├── build-your-brew.js     # Interactive flow logic
├── recommendations.js     # Results display logic
├── database.js            # Coffee database and utilities
├── coffee_database.json   # Coffee data in JSON format
├── bean.png              # Application logo
└── README.md             # This documentation
```

## 🌟 Features

- **Smart Recommendation Engine**: Advanced algorithm that matches your preferences with coffee characteristics
- **Interactive "Build Your Brew" Flow**: 3-step process for collecting preferences
- **Comprehensive Coffee Database**: Curated selection of premium coffee beans from around the world
- **Beautiful UI/UX**: Modern, responsive design with smooth animations
- **Multi-Page Experience**: Seamless navigation between different sections
- **Detailed Results**: Rich coffee descriptions with ratings and flavor profiles
- **Favorites System**: Save and manage your preferred coffees
- **User Profiles**: Track your coffee journey and preferences

## 🎯 How to Use

### 1. **Start Your Journey**
- Open the application to see the beautiful hero section
- Click "Find Your Brew" to begin the interactive experience

### 2. **Build Your Brew** (3-Step Process)
- **Step 1**: Pick Your Flavor Vibe (Fruity, Chocolate, Nutty, etc.)
- **Step 2**: Choose Your Coffee Feel (Acidity and Body preferences)
- **Step 3**: Select Your Adventure (Surprise Me, Pick Region, Pick Roast)

### 3. **Get Recommendations**
- View your personalized coffee recommendations
- Explore detailed descriptions and ratings
- Use "Surprise Me Again!" to discover more options

### 4. **Explore Further**
- Save favorites for future reference
- View detailed coffee information
- Start over to try different preferences

## ☕ Coffee Database

The app includes a curated database of premium coffee beans from around the world:

- **Ethiopian Yirgacheffe**: Bright, floral, citrus notes
- **Colombian Supremo**: Balanced chocolate and nutty flavors
- **Brazilian Santos**: Smooth, low-acid with rich nutty flavors
- **Guatemalan Antigua**: Full-bodied with chocolate and spice
- **Costa Rican Tarrazu**: Bright fruit notes with chocolate undertones
- **Kenyan AA**: Bold berry flavors with zesty citrus
- **Sumatra Mandheling**: Deep earthy notes with chocolate
- **Jamaican Blue Mountain**: Smooth, mild with balanced flavors
- **Peruvian Organic**: Well-rounded organic coffee
- **Honduran Marcala**: Full-bodied with chocolate and caramel
- **Nicaraguan Jinotega**: Balanced with chocolate and fruit
- **Mexican Chiapas**: Full-bodied with chocolate and nutty notes

## 🎨 Design Features

- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Loading States**: Visual feedback during recommendation generation
- **Coffee Theme**: Warm, inviting color palette inspired by coffee
- **Glass-morphism Effects**: Modern UI elements with transparency
- **Gradient Backgrounds**: Dynamic, animated backgrounds

## 🛠️ Technical Details

- **Frontend**: HTML5, Tailwind CSS, and Vanilla JavaScript
- **Styling**: Tailwind CSS with custom CSS for enhanced interactions
- **No Dependencies**: No external libraries or frameworks required
- **Cross-Browser Compatible**: Works on all modern browsers
- **Performance Optimized**: Fast loading and smooth interactions
- **Mobile-First**: Responsive design that works on all devices
- **Local Storage**: Saves user preferences and favorites locally
- **Modular Architecture**: Clean separation of concerns across files

## 🎯 Future Enhancements

Potential features for future versions:
- User accounts and preference history
- Coffee bean purchasing links
- Brewing method recommendations
- Social sharing of recommendations
- Expanded coffee database
- Advanced filtering options
- Dark mode toggle
- Coffee brewing guides
- Local coffee shop recommendations
- Machine learning improvements
- Integration with coffee APIs

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding more coffee varieties to the database
- Improving the recommendation algorithm
- Enhancing the UI/UX design
- Adding new features
- Optimizing performance
- Improving accessibility
- Expanding the coffee knowledge base

## 📄 License

This project is open source and available under the MIT License.

## ☕ Enjoy Your Coffee Journey!

Start exploring and discover your perfect coffee bean with Caffeine Compass!

---

*Made with ❤️ for coffee lovers everywhere* 