/** Transform the raw data fetched from the API to model it into an object that can be used by the different components
 * 
 * @param { object } rawData the raw data that is fetched from the api 
 * @param { string } type the type of data that is fetched
 * @returns { object } the formatted data that components will use to display the charts
 */
const formatData = (rawData, type) => {
   
    switch (type) {
        case 'activity':
        return rawData.data.sessions
        case 'sessions' :
            if(rawData && rawData.data.sessions && rawData.data.sessions.length) {
                let formattedData = []
                const days = [ "L", "M", "M", "J", "V", "S", "D"]
                rawData.data.sessions.forEach(session => {
                    let dataElement = {}
                    dataElement.name = days[(session.day)-1]
                    dataElement.value = session.sessionLength
                    formattedData.push(dataElement)
                })
                return formattedData;
            }
            break;
        case 'performance':
            if(rawData && rawData.data.data && rawData.data.data.length) {
                console.log(rawData)
                let formattedData = []
                rawData.data.data.forEach(element => {
                  let dataElement = {}
                  dataElement.subject = rawData.data.kind[element.kind]
                  switch (dataElement.subject) {
                    case "cardio":
                        dataElement.subject = "Cardio"
                        break;
                    case "energy":
                        dataElement.subject = "Energie"
                        break;
                    case "endurance":
                        dataElement.subject = "Energie"
                        break;
                    case "strength":
                        dataElement.subject = "Force"
                        break;
                    case "speed":
                        dataElement.subject = "Vitesse"
                        break;
                    case "intensity":
                        dataElement.subject = "Intensité"
                        break;
                    default:
                        break;
                  }
                  dataElement.value = element.value;
                  dataElement.fullMark = 150
                  formattedData.push(dataElement)
                })
                return formattedData;
            }
            break;
        default:
            break;
    }
}

export default formatData;