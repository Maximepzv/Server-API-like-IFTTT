module.exports = {
    start: function(options, reaction, List, user) {
        console.log('LAUNCH');
        try {
            List.reactions[reaction.title](reaction.options, user);
        }
        catch (e) {
            console.log('LAUNCH catch an error ' + e);
            return (e);
        }
    }
};
