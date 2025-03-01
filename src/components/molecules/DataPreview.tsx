import { transformData } from '@/utils/transformData';
import { UserData } from '@/utils/types';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

type Props = { data: UserData };

export function DataPreview({ data }: Readonly<Props>) {
  return (
    <Box>
      <UnorderedList>
        {Object.entries(transformData(data)).map(([key, value]) => (
          <ListItem key={key} display={'flex'} gap={'4'} mt={'2'}>
            <Text fontWeight={'bold'}>{key}&nbsp;:</Text>{' '}
            <Text>{value.toString()}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
