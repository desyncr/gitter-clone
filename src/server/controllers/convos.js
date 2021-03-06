import logger from '../config/logger';
import Convo  from '../models/Convo';

export const getConvos = (req, res) => {
  Convo.find({})
    .then((convos) => {
      res.json(convos);
    })
    .catch(/* istanbul ignore next */(err) => {
      logger.log('error', err);
    });
};

export const addConvo = (io, action) => {
  Convo.create({ name: action.name })
    .then((convo) => {
      io.emit('action', { // FIXME better decouple db & socket interactions
        type: 'ADD_CONVO',
        convo
      });
    })
    .catch(/* istanbul ignore next */(err) => {
      logger.log('error', err);
    });
};
