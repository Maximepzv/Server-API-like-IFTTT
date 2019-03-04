import { Router } from 'express';
import Weather from '../services/weather';

export default () => {
    let router = Router();

    router.post('/weather', function (req, res, next) {
       let param = {
           'city': req.body.city,
           'units': req.body.units,
           'function': req.body.fn,
           'limit': req.body.limit
       };
       console.log(param);
        let weather = new Weather(param);
        weather.start();
        /*try {
            let weather = new Weather(param);
            weather.start();
        }
        catch (e) {
            return res.status(500).send({success: false, msg: 'Invalid request. Weather has failed.'});
        }
        return res.status(200).send({success: true, msg: 'New weather with param ' + param});*/
    });

    return router;
}
