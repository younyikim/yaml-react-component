import { EventBusType, EventHandler } from '../types/utils';

/**
 * 새로운 EventBus 인스턴스를 생성합니다.
 * 이 EventBus는 이벤트에 대한 구독, 발행, 구독 취소를 관리합니다.
 *
 * @returns {EventBus} 이벤트 관리를 위한 메서드를 포함하는 EventBus 인스턴스입니다.
 */
export const eventBus: EventBusType = (() => {
  // 이벤트 구독자를 추적하는 객체
  const subscribers: { [event: string]: EventHandler<any>[] } = {};

  return {
    /**
     * 특정 이벤트에 핸들러를 구독합니다.
     * 이벤트가 발행될 때 핸들러가 페이로드와 함께 호출됩니다.
     *
     * @param {string} event - 구독할 이벤트의 이름입니다.
     * @param {EventHandler<T>} handler - 이벤트가 발행될 때 호출될 함수입니다.
     *
     * @template T - 핸들러가 기대하는 페이로드의 타입입니다.
     */
    subscribe<T>(event: string, handler: EventHandler<T>): void {
      if (!subscribers[event]) {
        subscribers[event] = [];
      }
      subscribers[event].push(handler);
    },

    /**
     * 특정 이벤트를 발행합니다.
     * 구독된 모든 핸들러가 페이로드와 함께 호출됩니다.
     *
     * @param {string} event - 발행할 이벤트의 이름입니다.
     * @param {T} payload - 이벤트와 함께 전송할 데이터입니다.
     *
     * @template T - 발행하는 페이로드의 타입입니다.
     */
    publish<T>(event: string, payload: T): void {
      if (subscribers[event]) {
        subscribers[event].forEach((handler) => {
          handler(payload);
        });
      }
    },

    /**
     * 특정 이벤트에서 핸들러의 구독을 취소합니다.
     * 핸들러는 이벤트가 발행될 때 더 이상 호출되지 않습니다.
     *
     * @param {string} event - 구독 취소할 이벤트의 이름입니다.
     * @param {EventHandler<T>} handler - 이벤트의 구독 목록에서 제거할 함수입니다.
     *
     * @template T - 핸들러가 기대하는 페이로드의 타입입니다.
     */
    unsubscribe<T>(event: string, handler: EventHandler<T>): void {
      if (subscribers[event]) {
        subscribers[event] = subscribers[event].filter((h) => h !== handler);
      }
    },
  };
})();
