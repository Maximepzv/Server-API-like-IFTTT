import {Router} from 'express';

export default ({ }) => {
    let app = Router();

    app.get('/', function (req, res) {
        return res.send({
            "client": {
                "host": req.ip
            },
            "server": {
                "current_time": Date.now(),
                "services": [
                    {
                        "name": "gmail",
                        "reactions": [{
                            "name": "send_mail",
                            "description": "This reaction will send an email from your Gmail account"
                        }
                        ]
                    }, {
                        "name": "calendar",
                        "reactions": [
                            {
                                "name": "add_to_calendar",
                                "description": "This reaction will create a new event in your Google calendar"
                            }
                        ]
                    }, {
                        "name": "rss",
                        "actions": [
                            {
                                "name": "matches_on_title",
                                "description": "This Trigger fires every time a new item in the feed you specify contains a particular keyword or simple phrase in the title"
                            }, {
                                "name": "matches_on_content",
                                "description": "This Trigger fires every time a new item in the feed you specify contains a particular keyword or simple phrase in the content"
                            }
                        ]
                    }, {
                        "name": "weather",
                        "actions": [
                            {
                                "name": "temperatureBelow",
                                "description": "This Trigger fires when the temperature drops below a specific value"
                            }, {
                                "name": "temperatureAbove",
                                "description": "This Trigger fires when the temperature rises above a specific value"
                            }, {
                                "name": "pressureBelow",
                                "description": "This Trigger fires when the pressure drops below a specific value"
                            }, {
                                "name": "pressureAbove",
                                "description": "This Trigger fires when the pressure goes above a specific value"
                            }, {
                                "name": "humidityAbove",
                                "description": "This Trigger fires when the humidity rises above a specific value"
                            }, {
                                "name": "humidityBelow",
                                "description": "This Trigger fires when the humidity drops below a specific value"
                            }
                        ]
                    }, {
                        "name": "time",
                        "actions": [
                            {
                                "name": "every_day_at",
                                "description": "This Trigger fires every single day at a specific time"
                            }, {
                                "name": "every_hour_at",
                                "description": "This Trigger fires every hour at a specific time"
                            }
                        ]
                    }, {
                        "name": "ping",
                        "reactions": [
                            {
                                "name": "ping_once",
                                "description": "This reaction will ping a specific ip"
                            }
                        ]
                    }
                ]
            }
        });
    });

    return app;
}
