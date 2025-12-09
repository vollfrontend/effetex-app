import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import type { InnerStackParamList } from './innerTypes';

export const navigationRef =
  createNavigationContainerRef<InnerStackParamList>();

export function nav<RouteName extends keyof InnerStackParamList>(
  name: RouteName,
  params?: InnerStackParamList[RouteName],
) {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}
