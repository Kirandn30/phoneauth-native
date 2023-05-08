import React from 'react';
import { Box, Button, HStack, Heading, Icon, IconButton, Pressable, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

const UserDeatilsHeader = ({ title, onBack, onRightButtonPress }: any) => {
    return (
        <Box safeAreaTop>
            <HStack alignItems="center" justifyContent="space-between">
                <IconButton
                    icon={<Icon as={<AntDesign name="left" color="black" />} />}
                    onPress={onBack}
                    bg="transparent"
                    _pressed={{
                        bg: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Heading size="md" fontWeight={500}>
                    {title}
                </Heading>
                <Button variant="unstyled" onPress={onRightButtonPress} py={2} px={4} borderRadius={4} colorScheme="red">
                    <Text className='text-red-600 font-semibold'>Logout</Text>
                </Button>

            </HStack>
        </Box>
    );
};

export default UserDeatilsHeader;

