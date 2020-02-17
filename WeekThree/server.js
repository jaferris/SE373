//require('bootstrap/dist/css/bootstrap.css');
var express = require('express');
var hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));


function rando(){
    return Math.round(Math.random()*4 + 1);
}


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


app.get('/form',(req, res)=>{
    res.render('form.hbs');
})

app.post('/results',(req,res)=>{
    res.render('results.hbs',{
        numberFromForm:req.body.selectpicker,
    })
})


app.use((req, res, next)=>{
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.render('error.hbs', {
        message:`${error.status} ${error.message}`,
        num:rando()
    });
})

app.listen(3000, ()=>{
    console.log('Server is running on Port 3000');
})
