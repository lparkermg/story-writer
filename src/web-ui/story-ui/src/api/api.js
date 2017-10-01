import Constants from '../constants/constants';

function getStories(){
    return sendRequest('story','GET');
}

function getStory(id){
    return sendRequest('story/' + id, 'GET');
}

function postStory(data){
    return sendRequest('story', 'POST',data,true);
}

function putStory(id, data){
    return sendRequest('story/' + id,'PUT',data,true);
}

function deleteStory(id){
    return sendRequest('story/' + id,'DELETE');
}

function sendRequest(path, action, data, json, returnXHR, withoutApiBase) {
    //load oauth key from localstorage

    var request = new XMLHttpRequest();

    var promise = new Promise(function(resolve, reject) {
        if(!withoutApiBase){
          request.open(action, Constants.API_BASE + '/' + path, true);
        }
        else{
          request.withCredentials = true;
          request.open(action,path,true);
        }
        request.setRequestHeader('Accept', 'application/json');
        if(json) {
            data = JSON.stringify(data);
            request.setRequestHeader('Content-Type', 'application/json');
        }

        request.onload = function() {
            var success = request.status >= 200 && request.status < 400;

            var data = request.responseText;
            var error = null;
            try {
                data = JSON.parse(request.responseText);
            } catch (err) {
                //don't care
                //error = err;
            }

            var result = {
                success: success,
                status: request.status,
                data: data,
                xhr: this
            };

            if(success) {
                if(action !== 'GET') {
                    setTimeout(function() { resolve(result); }, 200);
                } else {
                    resolve(result);
                }
            } else {
                reject(result);
            }
        };

        request.onerror = function() {
            if(!withoutApiBase){
              reject(Error('Could not connect to Story API'));
            }
            else {
              reject(Error('Could not connect to ' + path));
            }
        };

        request.send(data);
    });

    if(!returnXHR)
        return promise;

    return {
        promise: promise,
        xhr: request
    };
}

export default{
    getStories: getStories,
    getStory: getStory,
    postStory: postStory,
    putStory:putStory,
    deleteStory:deleteStory
}
