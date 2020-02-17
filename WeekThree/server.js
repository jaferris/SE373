//require('bootstrap/dist/css/bootstrap.css');
var express = require('express');
var hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

hbs.registerHelper('error404',(num)=>{
    var msg = "";
    let classes = ["shrink", "rotate", "still"];
    
    for (i=0; i<num; i++){
        var classNum = getRandomInt(0,3);
        msg += `<div class = "${classes[classNum]}">404</div>`;
    }
    return new hbs.handlebars.SafeString(msg);
})

hbs.registerHelper('options',()=>{
    var msg = "";
    let num = [3,4,5,10,20];
    for (i=0;i<num.length; i++){
        msg += `<option value="${num[i]}">${num[i]}</option>`;
    }
    return new hbs.handlebars.SafeString(msg);
})

hbs.registerHelper('table', (num)=>{
    var msg = `<table><tbody>`;

    for (let i =0; i<num; i++)
    {
        msg+=`<tr>`
        for (let k=0; k<num; k++)
        {
            var color = ((1<<24)*Math.random()|0).toString(16); 
            msg+=`<td style='background-color:#${color};'>${color}<br /><span style='color: #ffffff;'>${color}</span><td>`; 
        }
         msg+=`</tr>`
    }
    msg+=`</tbody></table>`;
    return new hbs.handlebars.SafeString(msg);
});

app.get('/', (req, res)=>{  
    res.render('index.hbs');
})

app.get('/form',(req, res)=>{
    res.render('form.hbs');
})

app.post('/results',(req,res)=>{
    res.render('results.hbs',{
        numberFromForm:req.body.selectpicker,
    })
})


app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.render('error.hbs', {
        message:`${error.message}`,
        num: getRandomInt(20, 51)
    });
})

app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
})
