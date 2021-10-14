const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/cosas-de-tiempo'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/cosas-de-tiempo/index.html'));
});

app.listen(process.env.PORT || 8080);
