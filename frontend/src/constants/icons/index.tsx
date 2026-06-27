// src/components/icons/index.tsx
import { FlameIcon, VirusIcon, StormIcon, LockIcon, HardHatIcon, RadioactiveIcon, BuildingIcon, SchoolIcon, WorkplaceIcon, LeafIcon } from '../../components/Icons/Icon'

export const ICON_MAP: Record<string, React.ReactNode> = {
  flame:       <FlameIcon />,
  virus:       <VirusIcon />,
  storm:       <StormIcon />,
  lock:        <LockIcon />,
  hardhat:     <HardHatIcon />,
  radioactive: <RadioactiveIcon />,
  building:    <BuildingIcon size={28} />,
  school:      <SchoolIcon size={28} />,
  workplace:   <WorkplaceIcon size={28} />,
  leaf:        <LeafIcon size={28} />,
}