import { Flex, Button, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { If } from '~/components';
import { useConfig, useMobile } from '~/context';
import { useBooleanValue, useLGState, useLGMethods } from '~/hooks';
import { Logo } from './logo';
import { TitleOnly } from './titleOnly';
import { SubtitleOnly } from './subtitleOnly';

import type { StackProps } from '@chakra-ui/react';
import type { TTitle, TTitleWrapper, TDWrapper } from './types';

const AnimatedVStack = motion.custom(VStack);

/**
 * Title wrapper for mobile devices, breakpoints sm & md.
 */
const MWrapper = (props: StackProps) => <VStack spacing={1} alignItems="flex-start" {...props} />;

/**
 * Title wrapper for desktop devices, breakpoints lg & xl.
 */
const DWrapper = (props: TDWrapper) => {
  const { isSubmitting } = useLGState();
  return (
    <AnimatedVStack
      spacing={1}
      initial="main"
      alignItems="center"
      animate={isSubmitting.value ? 'submitting' : 'main'}
      transition={{ damping: 15, type: 'spring', stiffness: 100 }}
      variants={{ submitting: { scale: 0.5 }, main: { scale: 1 } }}
      {...props}
    />
  );
};

/**
 * Universal wrapper for title sub-components, which will be different depending on the
 * `title_mode` configuration variable.
 */
const TitleWrapper = (props: TDWrapper | StackProps) => {
  const isMobile = useMobile();
  return (
    <>
      {isMobile ? <MWrapper {...(props as StackProps)} /> : <DWrapper {...(props as TDWrapper)} />}
    </>
  );
};

/**
 * Title sub-component if `title_mode` is set to `text_only`.
 */
const TextOnly = (props: TTitleWrapper) => {
  return (
    <TitleWrapper {...props}>
      <TitleOnly />
      <SubtitleOnly />
    </TitleWrapper>
  );
};

/**
 * Title sub-component if `title_mode` is set to `logo_only`. Renders only the logo.
 */
const LogoOnly = () => (
  <TitleWrapper>
    <Logo />
  </TitleWrapper>
);

/**
 * Title sub-component if `title_mode` is set to `logo_subtitle`. Renders the logo with the
 * subtitle underneath.
 */
const LogoSubtitle = () => (
  <TitleWrapper>
    <Logo />
    <SubtitleOnly />
  </TitleWrapper>
);

/**
 * Title sub-component if `title_mode` is set to `all`. Renders the logo, title, and subtitle.
 */
const All = () => (
  <TitleWrapper>
    <Logo />
    <TextOnly mt={2} />
  </TitleWrapper>
);

/**
 * Title component which renders sub-components based on the `title_mode` configuration variable.
 */
export const Title = (props: TTitle) => {
  const { fontSize, ...rest } = props;
  const { web } = useConfig();
  const titleMode = web.text.title_mode;

  const { isSubmitting } = useLGState();
  const { resetForm } = useLGMethods();

  const titleHeight = useBooleanValue(isSubmitting.value, undefined, { md: '20vh' });

  function handleClick(): void {
    isSubmitting.set(false);
    resetForm();
  }

  return (
    <Flex
      px={0}
      flexWrap="wrap"
      flexDir="column"
      minH={titleHeight}
      justifyContent="center"
      mt={[null, isSubmitting.value ? null : 'auto']}
      {...rest}>
      <Button
        px={0}
        variant="link"
        flexWrap="wrap"
        flexDir="column"
        onClick={handleClick}
        _focus={{ boxShadow: 'none' }}
        _hover={{ textDecoration: 'none' }}>
        <If c={titleMode === 'text_only'}>
          <TextOnly />
        </If>
        <If c={titleMode === 'logo_only'}>
          <LogoOnly />
        </If>
        <If c={titleMode === 'logo_subtitle'}>
          <LogoSubtitle />
        </If>
        <If c={titleMode === 'all'}>
          <All />
        </If>
      </Button>
    </Flex>
  );
};