import React, { useEffect } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

import { AnimationContainer } from './styles';

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // TODO - setup animated style
      //opacity: interpolate(cardOpacity.value, [0, 1], [0, 1], Extrapolate.CLAMP),
      opacity: cardOpacity.value,
      transform: [
        {
          translateX: cardOffset.value
        }
      ]
    }
  })

  useEffect(() => {
    /**
     * TODO - setup cardOpacity.value and cardOffset.value with
     * withTiming()
     */
    cardOpacity.value = withTiming(
      1,
      { duration: 1000 }
    );
    cardOffset.value = withTiming(
      0,
      { duration: 1000 }
    )
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  )
}

/**
 *  ALGUMAS INFORMAÇÕES IMPORTANTES
 * withTiming: muda o valor de uma propriedade ao longo de uma duração
 *  cardOffset.value = withTiming(0, {duration: 1000}):
 *    Muda o valor de cardOffset para 0 durante 1segundo
 * 
 * interpolate: calcular o valor que tem que ser colocado durante o intervalo do percurso 
 * opacity: interpolate(cardOpacity.value, [0, 1], [0, 1])
 *    Mudar o valor da opacidade durante o intervalo de 0 a 1, calculando o valor que a opacidade vai ter durante
 *    o percurso da animação
 */