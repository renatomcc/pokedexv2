import { useState } from 'react';
import styled from '@emotion/styled';
import { Card, Image, Text, Badge, Button, Group, Grid, Paper, BackgroundImage, Modal, createPolymorphicComponent, ButtonProps, Transition, CardProps, BadgeProps } from '@mantine/core';
import { Pokemon } from '../App';
import { FaInfoCircle } from 'react-icons/fa'
import { BsHeart, BsFillHeartFill, BsArrowDown } from 'react-icons/bs'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { TbGenderMale, TbGenderFemale, TbBeach, TbBeachOff, TbMountain } from 'react-icons/tb'
import { RiGenderlessLine } from 'react-icons/ri'
import { BiTennisBall, BiBasketball } from 'react-icons/bi'
import { GiTennisBall } from 'react-icons/gi'
import { CiMountain1 } from 'react-icons/ci'
import { GiRollingEnergy } from 'react-icons/gi'
import { setCardBGColor, setStatColor, setTextColor, setTypeColor } from '../utils/setColors'

var favorites: number[] = []

export default function Pokecard(props: IPokemonType) {
    const [modal, setModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [description, setDescription] = useState('')
    const [favorite, setFavorite] = useState(false)
    const [shiny, setShiny] = useState(false)
    const [mega, setMega] = useState(false)
    const [galar, setGalar] = useState(false)
    const [alola, setAlola] = useState(false)
    const [gmax, setGmax] = useState(false)
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
                    <Image
                        src={props.props.img}
                        width={160}
                        height={160}
                        alt={props.props.name}
                    />
                </StyledGroupCenter>
                <StyledGroupCenter>
                    <StyledText> {props.props.name} </StyledText>
                </StyledGroupCenter>
                <StyledGroupEvenly>
                    <Badge sx={{ padding: 4 }} variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[0].type.name)}`, color: `${setTextColor(props.props.types[0].type.name)}` }}>{props.props.types[0].type.name} </Badge>
                    {props.props.types[1] ? <Badge sx={{ padding: 4 }}  variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[1].type.name)}`, color: `${setTextColor(props.props.types[1].type.name)}` }}>{props.props.types[1].type.name} </Badge> : null}
                </StyledGroupEvenly>
                <Card.Section>
                    <StyledSquareButton variant="light" color="violet" fullWidth mt="md" radius="md" onClick={() => { setModal(true) }}>
                        <FaInfoCircle className='Icon' />
                        More Info
                    </StyledSquareButton>
                </Card.Section>
            </Card>


            {
                modal && (
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
                        <StyledGrid>
                            {/* LEFT CARD */}
                            <Grid.Col xs={10} sm={6} md={4} lg={4}>
                                <Card shadow="sm" p="md" radius="lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                    <Badge color="dark" variant="light" radius="md" size='xl'>#{props.props.id} </Badge>
                                    <StyledBadge color="dark" variant="light" radius="md" fullWidth size='xl'>{props.props.name} </StyledBadge>
                                    <Card shadow="sm" p="md" radius="lg" style={{ backgroundColor: 'transparent', border: '2px solid rgba(0,0,0,0.3)' }}>
                                        <Card.Section>
                                            <StyledButton variant="light" color="yellow" fullWidth mt="md" radius={0} onClick={() => { setShiny(!shiny) }} >
                                                {shiny ? <HiStar className='Icon' size='25px' /> : <HiOutlineStar className='Icon' size='25px' />}
                                                <Text weight={500} size='lg'>Shiny</Text>
                                            </StyledButton>
                                        </Card.Section>
                                        <Image
                                            src={mega ? shiny ? props.props.megaShiny : props.props.mega : galar ? shiny ? props.props.galarShiny : props.props.galar : alola ? shiny ? props.props.alolaShiny : props.props.alola : gmax ? shiny ? props.props.gmaxShiny : props.props.gmax : shiny ? props.props.imgShiny : props.props.img}
                                            fit='scale-down'
                                            alt={props.props.name}
                                            title={props.props.name}
                                        />
                                        {props.props.mega ?
                                            <Card.Section>
                                                <StyledButton variant="light" color="red" fullWidth mt="md" radius={0} onClick={() => { setMega(!mega), setPokeSprite('mega') }}>
                                                    {mega ? <GiTennisBall className='Icon' size='25px' /> : <BiTennisBall className='Icon' size='25px' />}
                                                    <Text weight={500} size='lg'>Mega</Text>
                                                </StyledButton>
                                            </Card.Section>
                                            : null}
                                        {props.props.alola ?
                                            <Card.Section>
                                                <StyledButton variant="light" color="lightblue" fullWidth mt="md" radius={0} onClick={() => { setAlola(!alola), setPokeSprite('alola') }} >
                                                    {alola ? <TbBeach className='Icon' size='25px' /> : <TbBeachOff className='Icon' size='25px' />}
                                                    <Text weight={500} size='lg'>Alola</Text>
                                                </StyledButton>
                                            </Card.Section>
                                            : null}
                                        {props.props.galar ?
                                            <Card.Section>
                                                <StyledButton variant="light" color="lightblue" fullWidth mt="md" radius={0} onClick={() => { setGalar(!galar), setPokeSprite('galar') }} >
                                                    {galar ? <TbMountain className='Icon' size='25px' /> : <CiMountain1 className='Icon' size='25px' />}
                                                    <Text weight={500} size='lg'>Galar</Text>
                                                </StyledButton>
                                            </Card.Section>
                                            : null}
                                        {props.props.gmax ?
                                            <Card.Section>
                                                <StyledButton variant="light" color="lightblue" fullWidth mt="md" radius={0} onClick={() => { setGmax(!gmax), setPokeSprite('gmax') }} >
                                                    {gmax ? <GiRollingEnergy className='Icon' size='25px' /> : <BiBasketball className='Icon' size='25px' />}
                                                    <Text weight={500} size='lg'>Gigantamax</Text>
                                                </StyledButton>
                                            </Card.Section>
                                            : null}
                                    </Card>
                                    {alola ?
                                        <StyledGroupEvenly position="apart" mt="md" mb="xs">
                                            <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.alolaTypes[0].type.name)}`, color: `${setTextColor(props.props.alolaTypes[0].type.name)}`, padding: '20px 30px' }}>{props.props.alolaTypes[0].type.name} </Badge>
                                            {props.props.alolaTypes[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.alolaTypes[1].type.name)}`, color: `${setTextColor(props.props.alolaTypes[1].type.name)}`, padding: '20px 30px' }}>{props.props.alolaTypes[1].type.name} </Badge> : null}
                                        </StyledGroupEvenly> :
                                        galar ?
                                            <StyledGroupEvenly position="apart" mt="md" mb="xs">
                                                <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.galarTypes[0].type.name)}`, color: `${setTextColor(props.props.galarTypes[0].type.name)}`, padding: '20px 30px' }}>{props.props.galarTypes[0].type.name} </Badge>
                                                {props.props.galarTypes[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.galarTypes[1].type.name)}`, color: `${setTextColor(props.props.galarTypes[1].type.name)}`, padding: '20px 30px' }}>{props.props.galarTypes[1].type.name} </Badge> : null}
                                            </StyledGroupEvenly> :
                                            <StyledGroupEvenly position="apart" mt="md" mb="xs">
                                                <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[0].type.name)}`, color: `${setTextColor(props.props.types[0].type.name)}`, padding: '20px 30px' }}>{props.props.types[0].type.name} </Badge>
                                                {props.props.types[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(props.props.types[1].type.name)}`, color: `${setTextColor(props.props.types[1].type.name)}`, padding: '20px 30px' }}>{props.props.types[1].type.name} </Badge> : null}
                                            </StyledGroupEvenly>}
                                    <StyledPaper>
                                        <Text weight={500}> Height: </Text>
                                        <Text weight={500}> {props.props.height} </Text>
                                    </StyledPaper>

                                    <StyledPaper style={{ marginTop: '10px' }}>
                                        <Text weight={500}> Weight: </Text>
                                        <Text weight={500}> {props.props.weight} </Text>
                                    </StyledPaper>

                                    {props.props.genderless ?
                                        <StyledPaper style={{ marginTop: '10px' }}>
                                            <StyledText >Genderless  <RiGenderlessLine size={18} stroke='grey' /></StyledText>
                                        </StyledPaper>
                                        :
                                        <StyledPaper style={{ marginTop: '10px' }}>
                                            <Text style={{ display: 'flex', alignItems: 'center' }}> {props.props.gender_rate_male} <TbGenderMale size={18} stroke='lightblue' /> </Text>
                                            <Text style={{ display: 'flex', alignItems: 'center' }}> {props.props.gender_rate_female} <TbGenderFemale size={18} stroke='#E75480' /></Text>
                                        </StyledPaper>
                                    }





                                </Card>
                            </Grid.Col>

                            {/* MIDDLE CARD */}
                            <Grid.Col xs={12} sm={6} md={8} lg={5}>
                                <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.2)' }}>
                                    <StyledTextTitle>Entry:</StyledTextTitle>
                                    <StyledStandartText> <br />{props.props.entry}</StyledStandartText>
                                </Card>
                                <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.2)', marginTop: '10px' }}>
                                    <StyledTextTitle>Abilities:</StyledTextTitle>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                                        <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${props.props.abilities[0].description}`), setDescriptionModal(true) }}>{props.props.abilities[0].name} </Button>
                                        {props.props.abilities[1]?.name != null ? <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${props.props.abilities[1].description}`), setDescriptionModal(true) }}> {props.props.abilities[1].name} </Button> : null}
                                        {props.props.abilities[2]?.name != null ? <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${props.props.abilities[2].description}`), setDescriptionModal(true) }}> {props.props.abilities[2].name} </Button> : null}
                                    </div>
                                </Card>
                                <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.4)', marginTop: '10px', color: 'white' }}>
                                    <StyledTextTitle>Stats:</StyledTextTitle>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '15px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                        {mega ? props.props.megaStats.map(stat => (
                                            <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                <Text weight={500}>{stat.base_stat}</Text>
                                            </StyledStatPaper>
                                        )) :
                                            galar ?
                                                props.props.galarStats.map(stat => (
                                                    <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                        <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                        <Text weight={500}>{stat.base_stat}</Text>
                                                    </StyledStatPaper>
                                                ))
                                                :
                                                alola ?
                                                    props.props.alolaStats.map(stat => (
                                                        <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                            <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                            <Text weight={500}>{stat.base_stat}</Text>
                                                        </StyledStatPaper>
                                                    ))
                                                    :
                                                    gmax ?
                                                        props.props.gmaxStats.map(stat => (
                                                            <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                                <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                                <Text weight={500}>{stat.base_stat}</Text>
                                                            </StyledStatPaper>
                                                        ))
                                                        :
                                                        props.props.stats.map(stat => (
                                                            <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                                <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                                <Text weight={500}>{stat.base_stat}</Text>
                                                            </StyledStatPaper>
                                                        ))
                                        }
                                    </div>
                                </Card>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0px', textAlign: 'center', gap: '5px' }}>
                                    <StyledPaperColumn>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>Habitat</Text>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{props.props.habitat}</Text>
                                    </StyledPaperColumn>
                                    <StyledPaperColumn>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>Shape</Text>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{props.props.shape}</Text>
                                    </StyledPaperColumn>
                                    <StyledPaperColumn>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>Category</Text>
                                        <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{props.props.category}</Text>
                                    </StyledPaperColumn>
                                </div>
                            </Grid.Col>

                            {/* RIGHT CARD */}
                            <SyledColumn xs={12} sm={12} md={12} lg={3}>
                                <StyledPaperCircle>
                                    <Image
                                        src={props.props.evolutionChain[0].image}
                                        width={150}
                                        height={150}
                                        alt={props.props.name}
                                    />
                                    <Text>{props.props.evolutionChain[0].name} </Text>
                                </StyledPaperCircle>

                                {props.props.evolutionChain[1].name ?
                                    <>
                                        <BsArrowDown size={20} />
                                        <StyledPaperCircle>
                                            <Image
                                                src={props.props.evolutionChain[1].image}
                                                width={150}
                                                height={150}
                                                alt={props.props.name}
                                            />
                                            <Text>{props.props.evolutionChain[1].name} </Text>
                                        </StyledPaperCircle>
                                    </>
                                    : null}

                                {props.props.evolutionChain[2].name ?
                                    <>
                                        <BsArrowDown size={20} />
                                        <StyledPaperCircle>
                                            <Image
                                                src={props.props.evolutionChain[2].image}
                                                width={150}
                                                height={150}
                                                alt={props.props.name}
                                            />
                                            <Text>{props.props.evolutionChain[2].name} </Text>
                                        </StyledPaperCircle>
                                    </>
                                    : null}
                            </SyledColumn>
                        </StyledGrid>
                    </Modal>
                )
            }

            {
                descriptionModal && (
                    <Modal
                        lockScroll={true}
                        centered
                        opened={true}
                        onClose={() => setDescriptionModal(false)}
                        size='auto'
                        padding='xs'
                        overflow='outside'
                    >
                        <Text weight={500}>{description}</Text>
                    </Modal>
                )
            }
        </>


    );

    function setPokeSprite(type: string) {
        switch (type) {
            case 'mega':
                setAlola(false)
                setGalar(false)
                setGmax(false)
                break;
            case 'alola':
                setMega(false)
                setGalar(false)
                setGmax(false)
                break;
            case 'galar':
                setAlola(false)
                setMega(false)
                setGmax(false)
                break;
            case 'gmax':
                setAlola(false)
                setGalar(false)
                setMega(false)
                break;
        }
    }
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

const _StyledBadge = styled(Badge)`
    padding: 0px;
    margin: 10px 0px;
`
const StyledBadge = createPolymorphicComponent<'button', BadgeProps>(_StyledBadge);

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

const StyledTextTitle = styled(StyledText)`
    background-color: transparent;
    margin-bottom: 5px;
    color: white;
`

const StyledStandartText = styled(StyledTextTitle)`
    margin-bottom: 0px;
    font-weight: 400;
`

const StyledPaper = styled.div`
    gap: 10px;
    borderRadius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;
    marginTop: 8px;
    gap: 5px;
    border-radius: 2px;
    box-shadow: rgba(0,0,0,0.4);
    background-color: rgba(0,0,0,0.3);
    color: white;
`;

const StyledPaperColumn = styled(StyledPaper)`
    flex-direction: column;
    font-weight: bold;
`

const StyledStatPaper = styled(StyledPaper)`
    justify-content: space-between;
    border: 1px solid rgba(0,0,0,0.8)
`

const StyledPaperCircle = styled(StyledPaperColumn)`
    width: 200px;
    height: 200px;
    border-radius: 50%;
`

const SyledColumn = styled(Grid.Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

const _StyledButton = styled(Button)`
    gap: 2px;
    margin-top: 0px;
    variant: light;
`;

const _StyledSquareButton = styled(Button)`
    border-radius: 0px;
`

const StyledButton = createPolymorphicComponent<'button', ButtonProps>(_StyledButton);
const StyledSquareButton = createPolymorphicComponent<'button', ButtonProps>(_StyledSquareButton);

const StyledGrid = styled(Grid)`
  background-color: #36486b;
  width: 100%;
  justify-content: center;
  align-items: center; 
  overflow: hidden;
  color: white
`;

