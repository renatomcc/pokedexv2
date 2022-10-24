import { useState } from 'react';
import styled from '@emotion/styled';
import { Card, Image, Badge, Button, Group, Grid, createPolymorphicComponent, ButtonProps, BadgeProps, Modal } from '@mantine/core';
import { Pokemon } from '../App';
import { FaInfoCircle } from 'react-icons/fa'
import { BsHeart, BsFillHeartFill } from 'react-icons/bs'
import { setCardBGColor, setTextColor, setTypeColor } from '../utils/setColors'
import PokeModal from './Modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

var favorites: number[] = []

export default function Pokecard(props: IPokemonType) {
    const [modal, setModal] = useState(false)
    const [favorite, setFavorite] = useState(false)
    let firstType: string = props.props.types[0].type.name;
    let secondType: string | null = props.props.types[1] ? props.props.types[1].type.name : null
    let length: number = props.props.types[1] ? 2 : 1
    let backGroundColor: string[] = [];


    backGroundColor = setCardBGColor(firstType, secondType, length)

    const setFav = (data: number) => {
        setFavorite(!favorite)
        if (!favorites.includes(data)) {
            favorites.push(data)
        }
        else {
            favorites.splice(favorites.indexOf(data), 1)
        }
    }

    return (
        <>
            <Card shadow="sm" p="xs" radius="md" style={{ width: '186px', background: `linear-gradient(${backGroundColor[0]} 40%, ${backGroundColor[1]})` }}>
                <StyledGroup >
                    <Badge color="dark" variant="light" radius="xs">#{props.props.id} </Badge>
                    {favorites.includes(props.props.id) ? <BsFillHeartFill fill='red' onClick={() => { setFav(props.props.id) }} /> : <BsHeart fill='white' onClick={() => { setFav(props.props.id) }} />}
                </StyledGroup>
                <StyledGroupCenter>
                    <LazyLoadImage
                        alt={props.props.name}
                        src={props.props.img}
                        width={160}
                        height={160}
                        delayMethod='debounce'
                        effect="blur"
                    />
                </StyledGroupCenter>
                <StyledGroupCenter>
                    <StyledText> {props.props.name[0].toUpperCase() + props.props.name.slice(1)} </StyledText>
                </StyledGroupCenter>
                <StyledGroupEvenly>
                    <Badge sx={{ padding: 4 }} variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[0].type.name)}`, color: `${setTextColor(props.props.types[0].type.name)}` }}>{props.props.types[0].type.name} </Badge>
                    {props.props.types[1] ? <Badge sx={{ padding: 4 }} variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[1].type.name)}`, color: `${setTextColor(props.props.types[1].type.name)}` }}>{props.props.types[1].type.name} </Badge> : null}
                </StyledGroupEvenly>
                <Card.Section>
                    <StyledSquareButton variant="light" color="violet" fullWidth mt="md" radius="md" onClick={() => { setModal(true) }}>
                        <FaInfoCircle className='Icon' />
                        More Info
                    </StyledSquareButton>
                </Card.Section>
            </Card>
            {modal && (
                <>
                    <Modal
                        lockScroll
                        centered
                        opened={true}
                        onClose={() => setModal(false)}
                        size={1200}
                        padding='xs'
                        overlayColor='black'
                        overlayBlur={2}
                        overlayOpacity={0.6}
                    >
                        <PokeModal
                            name={props.props.name}
                        />
                    </Modal>
                </>
            )}
        </>

    );
}

export { favorites }

interface IPokemonType {
    props: Pokemon
}

const StyledGroup = styled(Group)`
    border-width: 2px;
    margin: 10px 5px;
    justify-content: space-between;
    position: apart;
    mt: md;
    mb: xs;
`;

const StyledGroupCenter = styled(StyledGroup)`
    justify-content: center;
`

const StyledGroupEvenly = styled(StyledGroup)`
    justify-content: space-evenly;
`

const StyledText = styled.text`
    justify-content: center;
    alignItems: center;
    background-color: rgba(0,0,0,0.4);
    width: 80%;
    text-align: center;
    border-radius: 4px;
    font-weight: 600;
    color: white;
    text-shadow: rgba(0,0,0,0.4);
`;

const _StyledSquareButton = styled(Button)`
    border-radius: 0px;
`

const StyledSquareButton = createPolymorphicComponent<'button', ButtonProps>(_StyledSquareButton);

