import { Router } from 'express';
import Weather from '../services/weather';

export default () => {
    let router = Router();

    router.post('/weather', function (req, res, next) {
       let param = {
           'city': req.body.city,
           'units': req.body.units,
           'fn': req.body.fn,
           'limit': req.body.limit
       };
        console.log(param);
        let weather = new Weather(param);
        try {
            let job = weather.job();
            job.start();
        }
        catch (e) {
            return res.status(500).send({success: false, msg: 'Invalid request. Weather has failed.'});
        }
        return res.status(200).send({success: true, msg: 'New weather with '
            + '{City: ' + param.city + ' Units: ' + param.units
            + ' Function: ' + param.fn + ' Limit: ' + param.limit + '}'});
    });

    return router;
}
