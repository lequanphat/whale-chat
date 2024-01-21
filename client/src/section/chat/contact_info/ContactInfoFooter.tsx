import { useEffect, useState } from 'react';
import { BlockDialog, DeleteDialog } from '../../../components/dialog/ContactDialog';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { MdBlock } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoStar } from 'react-icons/io5';
import { ContactType, stateType } from '../../../store/interface';
import { useDispatch, useSelector } from 'react-redux';
import { faker } from '@faker-js/faker';
import { getMemberOfGroup } from '../../../store/slices/chatSlice';

export const ContactInfoFooter = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { currentContact } = useSelector((state: stateType) => state.chat);
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [members, setMembers] = useState([]);
  // handle
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  // effect
  useEffect(() => {
    (async () => {
      if (currentContact.type !== ContactType.USER) {
        const response = await dispatch(getMemberOfGroup(currentContact._id));
        if (response.payload.members) {
          setMembers(response.payload.members);
        }
      }
    })();
  }, [currentContact, dispatch]);

  // render
  return (
    <>
      {currentContact?.type === ContactType.USER ? (
        <>
          <Typography variant="body1">2 group in common</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={faker.image.url()} alt={faker.person.fullName()} />
            <Stack>
              <Typography variant="subtitle2">Coding Monk</Typography>
              <Typography variant="caption">16 members</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={faker.image.url()} alt={faker.person.fullName()} />
            <Stack>
              <Typography variant="subtitle2">Coding Monk</Typography>
              <Typography variant="caption">16 members</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              startIcon={<MdBlock />}
              variant="outlined"
              fullWidth
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              startIcon={<RiDeleteBin6Line />}
              variant="outlined"
              fullWidth
            >
              Delete
            </Button>
          </Stack>
        </>
      ) : (
        <Stack>
          <Typography variant="subtitle2" mb={2}>
            {`${currentContact?.members.length} members`}
          </Typography>

          <Stack spacing={2}>
            {members.map((member) => (
              <Stack key={member._id} direction="row" alignItems="center" spacing={1.4}>
                <Avatar src={member.avatar} />
                {member._id === currentContact.createdBy ? (
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body1">{member.displayName}</Typography>
                    <IoStar size={18} color="#f6e718" />
                  </Stack>
                ) : (
                  <Typography variant="body1">{member.displayName}</Typography>
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
      {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}
    </>
  );
};
