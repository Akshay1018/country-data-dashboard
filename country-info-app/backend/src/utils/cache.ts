import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 30 }); // for 20 mins

export default cache;
