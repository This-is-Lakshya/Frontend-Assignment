import React from 'react';
import { Switch, FormControl, FormLabel } from '@chakra-ui/react';

const ToggleSwitch = ({setToggleField}) => {

  return (
    <FormControl display='flex' alignItems='center' marginTop="1vmax">
        <FormLabel htmlFor='show' mb='0'>
            Show advance fields
        </FormLabel>
        <Switch  onChange={(e)=> setToggleField(e.target.checked)} />
    </FormControl>
  )
}

export default ToggleSwitch;