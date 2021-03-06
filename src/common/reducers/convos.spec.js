import convos, { convo } from './convos';

describe('convo reucer', () => {
  it('should handle ADD_CONVO', () => {
    expect(
      convo({}, {
        type: 'ADD_CONVO',
        convo: {
          _id: 0,
          createdAt: '2017-02-01T09:00:00-08:00',
          name: 'chat',
          __v: 0
        }
      })
    ).toMatchSnapshot('-> 1 convo');
  });

  it('should return state for default switch case', () => {
    expect(
      convo({}, {
        type: 'fooBar'
      })
    ).toMatchSnapshot('default');
  });
});

describe('convos reducer', () => {
  it('should handle initial state', () => {
    expect(
      convos(undefined, {})
    ).toEqual({});
  });

  it('should handle fetch payload', () => {
    let action = {};
    expect(convos({}, action)).toMatchSnapshot('no payload');
    action = {
      payload: {
        entities: { convos: {}}
      }
    };
    expect(convos({}, action)).toMatchSnapshot('with payload');
  });

  it('convos should handle ADD_CONVO', () => {
    expect(
      convos({}, {
        type: 'ADD_CONVO',
        convo: {
          _id: 0,
          createdAt: '2017-02-01T09:00:00-08:00',
          name: 'chat',
          __v: 0
        }
      })
    ).toMatchSnapshot('-> 1 convo');

    expect(
      convos({
        0: {
          _id: 0,
          createdAt: '2017-02-01T09:00:00-08:00',
          name: 'chat',
          __v: 0
        }
      }, {
        type: 'ADD_CONVO',
        convo: {
          _id: 1,
          createdAt: '2017-02-01T09:01:00-08:00',
          name: 'chat2',
          __v: 0
        }
      })
    ).toMatchSnapshot('-> 2 convos');

    expect(
      convos({
        0: {
          _id: 0,
          createdAt: '2017-02-01T09:00:00-08:00',
          name: 'chat',
          __v: 0
        },
        1: {
          _id: 1,
          createdAt: '2017-02-01T09:01:00-08:00',
          name: 'chat2',
          __v: 0
        }
      }, {
        type: 'ADD_CONVO',
        convo: {
          _id: 2,
          createdAt: '2017-02-01T09:02:00-08:00',
          name: 'chat3',
          __v: 0
        }
      })
    ).toMatchSnapshot('-> 3 convos');
  });
});
