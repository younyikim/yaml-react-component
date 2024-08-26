import { eventBus } from '../../utils/eventBus';

describe('eventBus', () => {
  it('should allow subscribing to an event', () => {
    const handler = jest.fn();

    eventBus.subscribe('testEvent1', handler);

    eventBus.publish('testEvent1', 'testPayload');

    expect(handler).toHaveBeenCalledWith('testPayload');
  });

  it('should allow unsubscribing from an event', () => {
    const handler = jest.fn();

    eventBus.subscribe('testEvent2', handler);
    eventBus.unsubscribe('testEvent2', handler);

    eventBus.publish('testEvent2', 'testPayload');

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple subscribers for the same event', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.subscribe('testEvent3', handler1);
    eventBus.subscribe('testEvent3', handler2);

    eventBus.publish('testEvent3', 'testPayload');

    expect(handler1).toHaveBeenCalledWith('testPayload');
    expect(handler2).toHaveBeenCalledWith('testPayload');
  });

  it('should handle different events separately', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.subscribe('event1', handler1);
    eventBus.subscribe('event2', handler2);

    eventBus.publish('event1', 'payload1');
    eventBus.publish('event2', 'payload2');

    expect(handler1).toHaveBeenCalledWith('payload1');
    expect(handler2).toHaveBeenCalledWith('payload2');
  });
});
