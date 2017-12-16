let nodejieba = require('nodejieba');

let nlp = {
    receiver: (info) => {
        // Gets Text and Tries to Parse.
        return info;
    },

    isPureString: (predata) => {
        
    },

    /*******************************
     *      Example of load()
     * nodejieba.load({
     * dict: nodejieba.DEFAULT_DICT,
     * hmmDict: nodejieba.DEFAULT_HMM_DICT,
     * userDict: './test/testdata/userdict.utf8',
     * idfDict: nodejieba.DEFAULT_IDF_DICT,
     * stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT
     * });
     *******************************/

    parser: (data) => {
        
    },

    tokenizer: (data) => {
        let result = nodejieba.tag(data);
        return result;
    },

    test: (data) => {
        let result = nodejieba.tag(data);
        return result;
    }
}

module.exports = nlp;