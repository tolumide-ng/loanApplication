import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: '8px',
        fontSize: 'md',
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 3,
          py: 1,
        },
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
        lg: {
          fontSize: 'lg',
          px: 6,
          py: 3,
        },
      },
      variants: {
        solid: {
          bg: 'teal.500',
          color: 'white',
          _hover: {
            bg: 'teal.600',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'teal.500',
          color: 'teal.500',
          _hover: {
            bg: 'teal.100',
          },
        },
        link: {
          color: 'gray.700',
          backgroundColor: 'transparent',
          _hover: {
            bg: 'gray.100',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          },
        },
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Link: {
      baseStyle: {
        textDecoration: 'none',
        fontSize: 'md',
        fontWeight: 'normal',
        _hover: {
          textDecoration: 'none',
          bg: 'gray.100',
        },
      },
    },
  },
});
