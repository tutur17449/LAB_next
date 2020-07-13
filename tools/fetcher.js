export default function fetcher(...args) {
    return new Promise((resolve, reject) => {
        fetch(...args)
        .then(apiResponse => {
            if (apiResponse.ok) {
                return apiResponse.json();
            }
            else {
                return apiResponse.json()
                .then(error => reject(error))
            };
        })
        .then(jsonData => {
            resolve(jsonData)
        })
        .catch(apiError => reject(apiError));
    })
}