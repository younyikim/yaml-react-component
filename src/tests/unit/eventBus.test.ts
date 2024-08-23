import { eventBus } from '../../utils/eventBus';

describe('eventBus', () => {
  it('should allow subscribing to an event', () => {
    const eventBusFn = eventBus();
    const handler = jest.fn();

    eventBusFn.subscribe('testEvent1', handler);

    eventBusFn.publish('testEvent1', 'testPayload');

    expect(handler).toHaveBeenCalledWith('testPayload');
  });

  it('should allow unsubscribing from an event', () => {
    const eventBusFn = eventBus();
    const handler = jest.fn();

    eventBusFn.subscribe('testEvent2', handler);
    eventBusFn.unsubscribe('testEvent2', handler);

    eventBusFn.publish('testEvent2', 'testPayload');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple subscribers for the same event', () => {
    const eventBusFn = eventBus();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBusFn.subscribe('testEvent3', handler1);
    eventBusFn.subscribe('testEvent3', handler2);

    eventBusFn.publish('testEvent3', 'testPayload');

    expect(handler1).toHaveBeenCalledWith('testPayload');
    expect(handler2).toHaveBeenCalledWith('testPayload');
  });

  it('should handle different events separately', () => {
    const eventBusFn = eventBus();
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBusFn.subscribe('event1', handler1);
    eventBusFn.subscribe('event2', handler2);

    eventBusFn.publish('event1', 'payload1');
    eventBusFn.publish('event2', 'payload2');

    expect(handler1).toHaveBeenCalledWith('payload1');
    expect(handler2).toHaveBeenCalledWith('payload2');
  });
});
