const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/layouts'));




app.get('/', (req, res) => {
    const squares = [
        '/image1.jpg',
        '/image2.jpg',
        '/image3.jpg',
        '/image4.jpg',
        '/image5.jpg',
        '/image6.jpg',
        '/image7.jpg',
        '/image8.jpg',
        '/image9.jpg'
    ]; 
    res.render('index', { squares });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
