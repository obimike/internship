import MaterialsCard from "./MaterialsCard";

function Materials() {
	return (
		<>
			<MaterialsCard name="Data Structure and Algorithm" totalContent={5} />
			<MaterialsCard name="Javascript" totalContent={9} />
			<MaterialsCard name="Python" totalContent={14} />
			<MaterialsCard name="Php" totalContent={26} />
			<MaterialsCard name="CSS" totalContent={15} />
			<MaterialsCard name="HTML" totalContent={6} />
			<MaterialsCard name="CSharp" totalContent={10} />
			<MaterialsCard name="Java" totalContent={3} />
		</>
	);
}

export default Materials;
