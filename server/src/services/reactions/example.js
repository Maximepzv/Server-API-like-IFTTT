module.exports = {
    exampleEveryDayAt: function(options, user) {
        console.log('Every Day At');
        console.log(new Date());
    },
    exampleEveryHourAt: function(options, user) {
        console.log('Every Hour At');
        console.log(new Date());
    },
    exampleMatchInTitle: function(options, user) {
        console.log('Match in title');
    },
    exampleMatchInContent: function(options, user) {
        console.log('Match in content');
    },
    exampleTemperatureBelow: function(options, user) {
        console.log('Temperature Below');
    },
    exampleTemperatureAbove: function(options, user) {
        console.log('Temperature Above');
    },
    examplePressureBelow: function(options, user) {
        console.log('Pressure Below');
    },
    examplePressureAbove: function(options, user) {
        console.log('Pressure Above');
    },
    exampleHumidityBelow: function(options, user) {
        console.log('Humidity Below');
    },
    exampleHumidityAbove: function(options, user) {
        console.log('Humidity Above');
    },
};
