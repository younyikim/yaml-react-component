// Typings
import { Component } from '../types/utils';

/**
 * 템플릿 중 컴포넌트의 이벤트 구독 및 발행 관련 코드를 위한 `useEffect` 훅 코드를 생성합니다.
 *
 * 주어진 컴포넌트의 `subscriptions` 및 `publications` 속성에 따라 `useEffect` 훅을 생성하여 이벤트 핸들러를 등록하고, 이벤트를 발행합니다.
 * `subscriptions` 배열에 포함된 각 이벤트에 대해 핸들러를 정의하고 `eventBus`를 통해 해당 이벤트를 구독합니다.
 * `publications` 배열에 포함된 각 이벤트를 발행합니다.
 * 또한, 컴포넌트가 언마운트될 때 모든 구독을 취소하는 클린업 코드를 추가합니다.
 *
 * @param component - 이벤트 구독 및 발행 정보를 포함한 컴포넌트 객체입니다. 이 객체는 `subscriptions` 및 `publications` 속성을 가집니다.
 * @returns `useEffect` 훅을 위한 코드 문자열을 반환합니다. 이벤트가 구독되거나 발행될 경우에만 코드가 포함됩니다.
 */
export function generateEventState(component: Component): string {
  const { subscriptions, publications } = component;

  let effectCode = '';

  if (subscriptions || (publications && publications.length)) {
    effectCode += '  useEffect(() => {\n';

    // Subscription 이벤트 등록
    if (subscriptions && subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        effectCode += `    const ${subscription.action} = () => {\n`;
        effectCode += `      console.log('${subscription.action}');\n`;
        effectCode += '    };\n\n';
        effectCode += `    eventBus.subscribe('${subscription.event}', ${subscription.action});\n`;
      });
    }

    // Publication 이벤트 등록
    if (publications && publications.length > 0) {
      publications.forEach((publication) => {
        effectCode += `    eventBus.publish('${publication}', {});\n`;
      });
    }

    // Cleanup 코드 추가
    if (subscriptions && subscriptions.length > 0) {
      effectCode += '\n    return () => {\n';
      subscriptions.forEach((subscription) => {
        effectCode += `      eventBus.unsubscribe('${subscription.event}', ${subscription.action});\n`;
      });
      effectCode += '    };\n';
    }

    effectCode += '  }, []);\n';
  }

  return effectCode;
}
