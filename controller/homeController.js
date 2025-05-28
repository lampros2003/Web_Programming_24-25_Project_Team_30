const homeController = {
  // GET home page
  getHomePage: (req, res, next) => {
    res.render('index', { 
      title: 'RESTAURANT',
      activeTab: 'about' 
    });
  },

  // GET about us page
  getAboutPage: (req, res, next) => {
    res.render('about', { 
      title: 'RESTAURANT', 
      activeTab: 'about'
    });
  }
};

module.exports = homeController;
