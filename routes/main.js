var app = module.parent.exports.app;
var Products = require('../models/products.js');
var User = require('../models/user.js');
var Payment = require('../models/payments.js');
var Categories = require('../models/categories.js');
var stripe = require("stripe")("sk_test_UHNMiTjAVmCO4K0shKjcyY3C");
var nodemailer = require('nodemailer');



//two database queries on one page
app.get('/profile', function(req, res){
var paymentPromise = Payment.find({ 'paidby': req.user.username }).sort('-date').exec();
var payment2Promise = Payment.find({ 'productOwner': req.user.username }).sort('-date').exec();
var productPromise = Products.find({ 'username': req.user.username }).sort('-date').exec();

Promise.all([paymentPromise, productPromise, payment2Promise]).then(
    docs => {
        let paymentDocs = docs[0];
        let payment2Docs = docs[2];
        let productDocs = docs[1];

        res.render('profile', {
            title: 'Your Products',
            products: productDocs,
            payment: paymentDocs,
            payment2: payment2Docs,
            firstname: req.user.firstName,
            lastname: req.user.lastName,
            email: req.user.email,
            username: req.user.username,
        });
    }
  );
});


//get all products except for products uploaded by logged in user and sort
/*app.get('/feed', function(req, res){
    var msg = req.flash('message');
    var username1 = req.user.username;
    Products.find({'username':{$ne: username1}}).sort('-date').exec(function(err, docs){
        res.render('feed', { title: 'Feed', products: docs, flashmsg: msg});
    });
});*/

app.get('/feed', function(req, res){
var categoryPromise = Categories.find({}).sort('-date').exec();
var productPromise = Products.find({'username':{$ne: req.user.username} }).sort('-date').exec();

Promise.all([categoryPromise, productPromise]).then(
    docs => {
        let categoryDocs = docs[0];
        let productDocs = docs[1];

        res.render('feed', {
            title: 'feed',
            products: productDocs,
            categories: categoryDocs,
        });
    }
  );
});


app.get('/payments', function(req, res){
    var username1 = req.user.username;
    Payment.find({'productOwner': req.user.username}).sort('-date').exec(function(err, docs){
        res.render('payments', { title: 'Payments', payment: docs});
        //console.log(payments);
    });

});

/*app.get('/filter/:name', function(req, res){
    //var username1 = req.user.username;
    Products.find({'category': req.params.name}).sort('-date').exec(function(err, docs){
        res.render('feed', { title: 'Feed', products: docs});
        //console.log(payments);
    });

});
*/
app.get('/filterByCategory/:name', function(req, res){
var categoryPromise = Categories.find({}).sort('-date').exec();
var productPromise = Products.find({ 'username':{$ne: req.user.username},'category': req.params.name }).sort('-date').exec();

Promise.all([categoryPromise, productPromise]).then(
    docs => {
        let categoryDocs = docs[0];
        let productDocs = docs[1];

        res.render('feed', {
            title: 'feed',
            products: productDocs,
            categories: categoryDocs,
        });
    }
  );
});

app.get('/filterByName/:name', function(req, res){
var name = req.params.name;
var categoryPromise = Categories.find({}).sort('-date').exec();
var productPromise = Products.find({ 'username':{$ne: req.user.username},'name': new RegExp(name, "i")}).sort('-date').exec();

Promise.all([categoryPromise, productPromise]).then(
    docs => {
        let categoryDocs = docs[0];
        let productDocs = docs[1];

        res.render('feed', {
            title: 'feed',
            products: productDocs,
            categories: categoryDocs,
        });
    }
  );
});




app.post('/charge', function(req, res){
  var username1 = req.user.username;
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  console.log(chargeAmount);
  var charge = stripe.charges.create({
    amount: chargeAmount, // Amount in cents
    currency: "eur",
    source: token,
    description:req.body.description
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log('declined');
    }
  });


  var p = new Payment({ name:req.body.name, description: req.body.description, amount: chargeAmount, paidby: username1, productOwner: req.body.owner,  date: new Date()});
  p.save(function(err, doc){

  });

  var transporter = nodemailer.createTransport({
  service:'Gmail',
  auth: {
    user: 'assignment2node@gmail.com',
    pass: 'janeleeassignment2'
    }
  });

  var mailOptions = {
    from: 'Payment Notification <assignment2node@gmail.com>',
    to: 'janelee920@gmail.com',
    subject: 'New Payment Received',
    //test: ' You have recieved a new payment for one of your products.. Name:' +req.body.name+ 'Amount:' +req.body.amount+ 'Description:' +req.body.description,
    html:'<p> The following product has been purchased</p> <ul><li> ' +req.body.name+'</li> <li> Amount:'  +req.body.chargeAmount+ '</li> <li> Description:'  +req.body.description+'</li></ul>'

  };

  transporter.sendMail(mailOptions, function(error,info){
    if(error){
        res.redirect('/feed');
    }else{

      res.redirect('/profile');
    }
  });

  });


// get all products for logged in user and sort
/*app.get('/profile', function(req, res){
    var msg = req.flash('message');
    Products.find({'username': req.user.username}).sort('-date').exec(function(err, docs){

        res.render('profile', { title: 'Your Products',
        products: docs,
        firstname:req.user.firstName,
        lastname:req.user.lastName,
        email:req.user.email,
        username:req.user.username,
      });

    });
});
*/



app.get('/new', function(req, res){
    req.flash('message', 'You visited /new');
    res.render('new', { title: 'New'});
});

app.post('/new', function(req, res){
    console.log(req.body);
    var username1 = req.user.username;
    var p = new Products({ name: req.body.name, description: req.body.description, price: req.body.price , username: username1, date: new Date() });
    p.save(function(err, doc){
        if(!err){
            res.redirect('/profile');
        } else {
            res.end(err);
        }
    });
});

app.get('/delete/:id', function(req, res){
    Products.remove({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.redirect('/profile');
        } else {
            res.end(err);
        }
    });
});

app.get('/edit/:id', function(req, res){
    Products.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            res.render('edit', { title: 'Edit', products: doc});
        } else {
            res.end(err);
        }
    });
});

app.post('/edit/:id', function(req, res){
    Products.findOne({ _id: req.params.id }, function(err, doc){
        if(!err){
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.price = req.body.price;
            doc.imageURL = req.body.imageURL;
            doc.save(function(err, doc){
                if(!err){
                    res.redirect('/profile');
                } else {
                    res.end(err);
                }
            });
        } else {
            res.end(err);
        }
    });
});
