import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Card, Image, Text, Badge, Button, Group, Grid, createPolymorphicComponent, Modal, ButtonProps, BadgeProps, Loader, Paper, keyframes } from '@mantine/core';
import { BsArrowDown } from 'react-icons/bs'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { TbGenderMale, TbGenderFemale, TbBeach, TbBeachOff, TbMountain } from 'react-icons/tb'
import { RiGenderlessLine } from 'react-icons/ri'
import { BiTennisBall, BiBasketball } from 'react-icons/bi'
import { GiTennisBall } from 'react-icons/gi'
import { CiMountain1 } from 'react-icons/ci'
import { GiRollingEnergy } from 'react-icons/gi'
import { setStatColor, setTextColor, setTypeColor } from '../utils/setColors'
import React from 'react';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';

var favorites: number[] = []

interface IName {
    name: string
}

export default function PokeModal(props: IName) {
    const [descriptionModal, setDescriptionModal] = useState(false)
    const [description, setDescription] = useState('')
    const [shiny, setShiny] = useState(false)
    const [mega, setMega] = useState(false)
    const [galar, setGalar] = useState(false)
    const [alola, setAlola] = useState(false)
    const [gmax, setGmax] = useState(false)
    const [fetching, setFetching] = useState(true);
    const [fetchingVarieties, setFetchingVarieties] = useState(false)
    let poke: Poke = {
        id: 0,
        name: '',
        img: '',
        imgShiny: '',
        types: [],
        alolaTypes: [],
        galarTypes: [],
        height: '',
        weight: '',
        abilities: [
            {
                name: '',
                description: '',
            },
            {
                name: null,
                description: null,
            },
            {
                name: null,
                description: null,
            }
        ],
        stats: [],
        megaStats: [],
        alolaStats: [],
        galarStats: [],
        entry: '',
        title: '',
        habitat: '',
        gender_rate_male: '',
        gender_rate_female: '',
        genderless: false,
        category: '',
        evolutionChain: [
            {
                name: '',
                image: '',
            },
            {
                name: '',
                image: '',
            },
            {
                name: '',
                image: '',
            }],
        shape: '',
        mega: undefined,
        megaShiny: undefined,
        alola: undefined,
        alolaShiny: undefined,
        galar: undefined,
        galarShiny: undefined,
        gmax: undefined,
        gmaxShiny: undefined,
    }
    const [pokemon, setPokemon] = useState<Poke>(poke);

    const fetchInfos = async (name: string) => {
        setFetching(true)
        setAlola(false)
        setMega(false)
        setGalar(false)
        setGmax(false)
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(async res => {
            poke.id = res.data.id;
            poke.name = res.data.name[0].toUpperCase() + res.data.name.slice(1);
            poke.img = res.data.sprites.other.home.front_default;
            poke.imgShiny = res.data.sprites.other.home.front_shiny;
            poke.types = res.data.types;
            poke.height = ((Number(res.data.height + '0') / 100 + 'm') + ' / ' + (((Number(res.data.height + '0') / 100) * 3.2808).toFixed(2).replace('.', "'") + "''"));
            poke.weight = (Number(res.data.weight + '0') / 100 + 'kg' + ' / ' + (((Number(res.data.weight + '0') / 100) * 2.20462262185).toFixed(2)) + 'lbs').replace('.', ',')
            poke.stats = res.data.stats;

            res.data.abilities.map(async (ability: any, i: number) => {
                poke.abilities[i].name = ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1);
                await axios.get(`${ability.ability.url}`).then(res => {
                    poke.abilities[i].description = res.data.flavor_text_entries.filter((entry: any) => entry.language.name == 'en')[0].flavor_text[0].toUpperCase() + res.data.flavor_text_entries.filter((entry: any) => entry.language.name == 'en')[0].flavor_text.slice(1)
                })
            })

            await axios.get(`${res.data.species.url}`).then(async res => {

                if (res.data.varieties[1]) {
                    setFetchingVarieties(true)
                    res.data.varieties.map(async (data: any) => {
                        if (data.pokemon.name.includes('mega')) {
                            await axios.get(`${data.pokemon.url}`).then(res => {
                                poke.mega = res.data.sprites.other.home.front_default
                                poke.megaShiny = res.data.sprites.other.home.front_shiny ? res.data.sprites.other.home.front_shiny : 'https://i.ibb.co/YftfZkZ/no-img-available.png'
                                poke.megaStats = res.data.stats
                            }).then(res => { setFetchingVarieties(false) })
                        }
                        if (data.pokemon.name.includes('alola')) {
                            await axios.get(`${data.pokemon.url}`).then(async res => {
                                poke.alola = res.data.sprites.other.home.front_default
                                poke.alolaShiny = res.data.sprites.other.home.front_shiny ? res.data.sprites.other.home.front_shiny : 'https://i.ibb.co/YftfZkZ/no-img-available.png'
                                poke.alolaStats = res.data.stats
                                poke.alolaTypes = res.data.types
                            }).then(async res => { setFetchingVarieties(false) })
                        }
                        if (data.pokemon.name.includes('galar')) {
                            await axios.get(`${data.pokemon.url}`).then(async res => {
                                poke.galar = res.data.sprites.other.home.front_default
                                poke.galarShiny = res.data.sprites.other.home.front_shiny ? res.data.sprites.other.home.front_shiny : 'https://i.ibb.co/YftfZkZ/no-img-available.png'
                                poke.galarStats = res.data.stats
                                poke.galarTypes = res.data.types
                            }).then(async res => { setFetchingVarieties(false) })
                        }
                        if (data.pokemon.name.includes('gmax')) {
                            await axios.get(`${data.pokemon.url}`).then(async res => {
                                poke.gmax = res.data.sprites.other.home.front_default
                                poke.gmaxShiny = res.data.sprites.other.home.front_shiny ? res.data.sprites.other.home.front_shiny : 'https://i.ibb.co/YftfZkZ/no-img-available.png'
                            }).then(async res => { setFetchingVarieties(false) })
                        }
                    })
                }


                poke.entry = (res.data.flavor_text_entries.filter((entry: any) => entry.language.name == 'en')[0].flavor_text).replace(/\n|\f/gm, " ");
                poke.title = res.data.genera[7].genus.replace('\n', " ");

                if (res.data.habitat) poke.habitat = res.data.habitat.name[0].toUpperCase() + res.data.habitat.name.slice(1)

                let maleRate = ((Number(res.data.gender_rate + '00') / 8) - 100) * -1
                let femaleRate = Number(res.data.gender_rate + '00') / 8
                if (maleRate > 100 || maleRate < 0) poke.genderless = true;
                else {
                    poke.gender_rate_male = maleRate + '%';
                    poke.gender_rate_female = femaleRate + '%';
                }

                if (res.data.shape) poke.shape = res.data.shape.name[0].toUpperCase() + res.data.shape.name.slice(1)

                if (res.data.is_baby) poke.category = 'Baby'
                if (res.data.is_mythical) poke.category = 'Mythical'
                if (res.data.is_legendary) poke.category = 'Legendary'
                if (!res.data.is_baby && !res.data.is_mythical && !res.data.is_legendary) poke.category = 'Normal'


                await axios.get(`${res.data.evolution_chain.url}`).then(async res => {
                    poke.evolutionChain[0].name = res.data.chain.species.name[0].toUpperCase() + res.data.chain.species.name.slice(1)
                    await axios.get(`${res.data.chain.species.url}`).then(async res => {
                        await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}`).then(res => {
                            poke.evolutionChain[0].image = res.data.sprites.other.home.front_default
                        })
                    })

                    if (res.data.chain.evolves_to[0]?.species.name != null) {
                        poke.evolutionChain[1].name = res.data.chain.evolves_to[0].species.name[0].toUpperCase() + res.data.chain.evolves_to[0].species.name.slice(1)
                        await axios.get(`${res.data.chain.evolves_to[0].species.url}`).then(async res => {
                            await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}`).then(res => {
                                poke.evolutionChain[1].image = res.data.sprites.other.home.front_default
                            })
                        })
                    }

                    if (res.data.chain.evolves_to[0]?.evolves_to[0]?.species.name != null) {
                        poke.evolutionChain[2].name = res.data.chain.evolves_to[0].evolves_to[0].species.name[0].toUpperCase() + res.data.chain.evolves_to[0].evolves_to[0].species.name.slice(1)
                        await axios.get(`${res.data.chain.evolves_to[0].evolves_to[0].species.url}`).then(async res => {
                            await axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.id}`).then(res => {
                                poke.evolutionChain[2].image = res.data.sprites.other.home.front_default
                            })
                        })
                    }
                })
            })
        }).then(res => {
            setPokemon(poke)
            setFetching(false)
            return res;
        })
    }

    useEffect(() => {
        fetchInfos(props.name);
    }, [])

    return (
        <>
            {!fetching && !fetchingVarieties ? (
                <StyledGrid>
                    {/* LEFT CARD */}
                    <Grid.Col xs={10} sm={6} md={4} lg={4}>
                        <Card shadow="sm" p="md" radius="lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <Badge color="dark" variant="light" radius="md" size='xl'># {pokemon.id} </Badge>
                            <StyledBadge color="dark" variant="light" radius="md" fullWidth size='xl'> {pokemon.name} </StyledBadge>
                            <Card shadow="sm" p="md" radius="lg" style={{ backgroundColor: 'transparent', border: '2px solid rgba(0,0,0,0.3)' }}>
                                <Card.Section>
                                    <StyledButton variant="light" color="yellow" fullWidth mt="md" radius={0} onClick={() => { setShiny(!shiny) }} >
                                        {shiny ? <HiStar className='Icon' size='25px' /> : <HiOutlineStar className='Icon' size='25px' />}
                                        <Text weight={500} size='lg'>Shiny</Text>
                                    </StyledButton>
                                </Card.Section>
                                <LazyLoadImage
                                    alt={pokemon.name}
                                    src={mega ? shiny ? pokemon.megaShiny : pokemon.mega : galar ? shiny ? pokemon.galarShiny : pokemon.galar : alola ? shiny ? pokemon.alolaShiny : pokemon.alola : gmax ? shiny ? pokemon.gmaxShiny : pokemon.gmax : shiny ? pokemon.imgShiny : pokemon.img}
                                    width='100%'
                                    delayMethod={'debounce'}
                                    effect="blur"
                                />
                                {pokemon.mega ?
                                    <Card.Section>
                                        <StyledButton variant="light" color="red" fullWidth mt="md" radius={0} onClick={() => { setMega(!mega), setPokeSprite('mega') }}>
                                            {mega ? <GiTennisBall className='Icon' size='25px' /> : <BiTennisBall className='Icon' size='25px' />}
                                            <Text weight={500} size='lg'>Mega</Text>
                                        </StyledButton>
                                    </Card.Section>
                                    : null}
                                {pokemon.alola ?
                                    <Card.Section>
                                        <StyledButton variant="light" color="lightblue" fullWidth mt="md" radius={0} onClick={() => { setAlola(!alola), setPokeSprite('alola') }} >
                                            {alola ? <TbBeach className='Icon' size='25px' /> : <TbBeachOff className='Icon' size='25px' />}
                                            <Text weight={500} size='lg'>Alola</Text>
                                        </StyledButton>
                                    </Card.Section>
                                    : null}
                                {pokemon.galar ?
                                    <Card.Section>
                                        <StyledButton variant="light" color="lightblue" fullWidth mt="md" radius={0} onClick={() => { setGalar(!galar), setPokeSprite('galar') }} >
                                            {galar ? <TbMountain className='Icon' size='25px' /> : <CiMountain1 className='Icon' size='25px' />}
                                            <Text weight={500} size='lg'>Galar</Text>
                                        </StyledButton>
                                    </Card.Section>
                                    : null}
                                {pokemon.gmax ?
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
                                    <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.alolaTypes[0].type.name)}`, color: `${setTextColor(pokemon.alolaTypes[0].type.name)}`, padding: '20px 30px' }}>{pokemon.alolaTypes[0].type.name} </Badge>
                                    {pokemon.alolaTypes[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.alolaTypes[1].type.name)}`, color: `${setTextColor(pokemon.alolaTypes[1].type.name)}`, padding: '20px 30px' }}>{pokemon.alolaTypes[1].type.name} </Badge> : null}
                                </StyledGroupEvenly> :
                                galar ?
                                    <StyledGroupEvenly position="apart" mt="md" mb="xs">
                                        <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.galarTypes[0].type.name)}`, color: `${setTextColor(pokemon.galarTypes[0].type.name)}`, padding: '20px 30px' }}>{pokemon.galarTypes[0].type.name} </Badge>
                                        {pokemon.galarTypes[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.galarTypes[1].type.name)}`, color: `${setTextColor(pokemon.galarTypes[1].type.name)}`, padding: '20px 30px' }}>{pokemon.galarTypes[1].type.name} </Badge> : null}
                                    </StyledGroupEvenly> :
                                    <StyledGroupEvenly position="apart" mt="md" mb="xs">
                                        <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.types[0].type.name)}`, color: `${setTextColor(pokemon.types[0].type.name)}`, padding: '20px 30px' }}>{pokemon.types[0].type.name} </Badge>
                                        {pokemon.types[1] ? <Badge variant="filled" radius="xs" style={{ backgroundColor: `${setTypeColor(pokemon.types[1].type.name)}`, color: `${setTextColor(pokemon.types[1].type.name)}`, padding: '20px 30px' }}>{pokemon.types[1].type.name} </Badge> : null}
                                    </StyledGroupEvenly>
                            }
                            <StyledPaper>
                                <Text weight={500}> Height: </Text>
                                <Text weight={500}> {pokemon.height} </Text>
                            </StyledPaper>

                            <StyledPaper style={{ marginTop: '10px' }}>
                                <Text weight={500}> Weight: </Text>
                                <Text weight={500}> {pokemon.weight} </Text>
                            </StyledPaper>

                            {pokemon.genderless ?
                                <StyledPaper style={{ marginTop: '10px' }}>
                                    <StyledText >Genderless  <RiGenderlessLine size={18} stroke='grey' /></StyledText>
                                </StyledPaper>
                                :
                                <StyledPaper style={{ marginTop: '10px' }}>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}> {pokemon.gender_rate_male} <TbGenderMale size={18} stroke='lightblue' /> </Text>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}> {pokemon.gender_rate_female} <TbGenderFemale size={18} stroke='#E75480' /></Text>
                                </StyledPaper>
                            }
                        </Card>
                    </Grid.Col>

                    {/* MIDDLE CARD */}
                    <Grid.Col xs={12} sm={6} md={8} lg={5}>
                        <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <StyledTextTitle>Entry:</StyledTextTitle>
                            <StyledStandartText> <br />{pokemon.entry}</StyledStandartText>
                        </Card>
                        <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.2)', marginTop: '10px' }}>
                            <StyledTextTitle>Abilities:</StyledTextTitle>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                                <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${pokemon.abilities[0].description}`), setDescriptionModal(true) }}>{pokemon.abilities[0].name} </Button>
                                {pokemon.abilities[1]?.name != null ? <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${pokemon.abilities[1].description}`), setDescriptionModal(true) }}> {pokemon.abilities[1].name} </Button> : null}
                                {pokemon.abilities[2]?.name != null ? <Button variant="filled" color="dark" compact radius="sm" size='md' onClick={() => { setDescription(`${pokemon.abilities[2].description}`), setDescriptionModal(true) }}> {pokemon.abilities[2].name} </Button> : null}
                            </div>
                        </Card>
                        <Card shadow="sm" p="md" radius="md" style={{ background: 'rgba(0,0,0,0.2)', marginTop: '10px', color: 'white' }}>
                            <StyledTextTitle>Stats:</StyledTextTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '15px', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                                {mega ? pokemon.megaStats.map(stat => (
                                    <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                        <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                        <Text weight={500}>{stat.base_stat}</Text>
                                    </StyledStatPaper>
                                )) :
                                    galar ?
                                        pokemon.galarStats.map(stat => (
                                            <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                <Text weight={500}>{stat.base_stat}</Text>
                                            </StyledStatPaper>
                                        ))
                                        :
                                        alola ?
                                            pokemon.alolaStats.map(stat => (
                                                <StyledStatPaper key={stat.index} style={{ background: `linear-gradient(to right, ${setStatColor(stat.stat.name)} ${stat.base_stat / 1.75}%, transparent 1%) no-repeat` }}>
                                                    <Text weight={500}> {stat.stat.name.toUpperCase()}</Text>
                                                    <Text weight={500}>{stat.base_stat}</Text>
                                                </StyledStatPaper>
                                            ))
                                            :
                                            pokemon.stats.map(stat => (
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
                                <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{pokemon.habitat}</Text>
                            </StyledPaperColumn>
                            <StyledPaperColumn>
                                <Text weight={600} size='md' style={{ marginBottom: '5px' }}>Shape</Text>
                                <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{pokemon.shape}</Text>
                            </StyledPaperColumn>
                            <StyledPaperColumn>
                                <Text weight={600} size='md' style={{ marginBottom: '5px' }}>Category</Text>
                                <Text weight={600} size='md' style={{ marginBottom: '5px' }}>{pokemon.category}</Text>
                            </StyledPaperColumn>
                        </div>
                    </Grid.Col>

                    {/* RIGHT CARD */}
                    <SyledColumn xs={12} sm={12} md={12} lg={3}>
                        <StyledPaperCircle onClick={() => { fetchInfos(pokemon.evolutionChain[0].name[0].toLowerCase() + pokemon.evolutionChain[0].name.slice(1)) }}>
                            <LazyLoadImage
                                alt={pokemon.name}
                                src={pokemon.evolutionChain[0].image}
                                width={150}
                                height={150}
                                delayMethod='debounce'
                                effect="blur"
                            />
                            <Text>{pokemon.evolutionChain[0].name} </Text>
                        </StyledPaperCircle>

                        {pokemon.evolutionChain[1].name ?
                            <>
                                <BsArrowDown size={20} />
                                <StyledPaperCircle onClick={() => { fetchInfos(pokemon.evolutionChain[1].name[0].toLowerCase() + pokemon.evolutionChain[1].name.slice(1)) }}>
                                    <LazyLoadImage
                                        alt={pokemon.name}
                                        src={pokemon.evolutionChain[1].image}
                                        width={150}
                                        height={150}
                                        delayMethod='debounce'
                                        effect="blur"
                                    />
                                    <Text>{pokemon.evolutionChain[1].name} </Text>
                                </StyledPaperCircle>
                            </>
                            : null}

                        {pokemon.evolutionChain[2].name ?
                            <>
                                <BsArrowDown size={20} />
                                <StyledPaperCircle onClick={() => { fetchInfos(pokemon.evolutionChain[2].name[0].toLowerCase() + pokemon.evolutionChain[2].name.slice(1)) }}>
                                    <LazyLoadImage
                                        alt={pokemon.name}
                                        src={pokemon.evolutionChain[2].image}
                                        width={150}
                                        height={150}
                                        delayMethod='debounce'
                                        effect="blur"
                                    />
                                    <Text>{pokemon.evolutionChain[2].name} </Text>
                                </StyledPaperCircle>
                            </>
                            : null}
                    </SyledColumn>
                </StyledGrid>
            ) :
                (
                    <StyledPaper>
                        <Badge color="pink" size="xl" radius="sm" variant="filled">Catching...</Badge>
                        <Loader color="pink" variant="dots" />
                    </StyledPaper>
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
    border: 1px solid rgba(0,0,0,0.8);
`

const StyledPaperCircle = styled(StyledPaperColumn)`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    cursor: pointer;
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

const StyledGrid = styled(Grid)`
  background-color: #36486b;
  width: 100%;
  justify-content: center;
  align-items: center; 
  overflow: hidden;
  color: white
`;

interface Poke {
    id: number,
    name: string,
    img: string,
    imgShiny: string,
    types: any[],
    alolaTypes: any[],
    galarTypes: any[],
    height: string,
    weight: string,
    abilities: any[],
    stats: any[],
    megaStats: any[],
    alolaStats: any[],
    galarStats: any[],
    entry: string,
    title: string,
    habitat: string,
    gender_rate_male: string,
    gender_rate_female: string,
    genderless: boolean,
    category: string,
    evolutionChain: any[],
    shape: string,
    mega: string | undefined,
    megaShiny: string | undefined,
    alola: string | undefined,
    alolaShiny: string | undefined,
    galar: string | undefined,
    galarShiny: string | undefined,
    gmax: string | undefined,
    gmaxShiny: string | undefined,
}
